import axios from "axios";
import {
  DEFAULT_VERSION,
  PAYMENT_ENDPOINT,
  REFUND_ENDPOINT,
  SANDBOX_BASE_URL,
} from "./constants";
import {
  CreatePayment,
  IpnParams,
  RefundParams,
  RefundPayment,
  VnpayConfig,
} from "./types";
import { buildSearchParams, generateSecureHash } from "./utils";

export class VnpayClient {
  config: VnpayConfig;

  constructor({
    baseUrl = SANDBOX_BASE_URL,
    version = DEFAULT_VERSION,
    ...rest
  }: VnpayConfig) {
    this.config = {
      baseUrl,
      version,
      ...rest,
    };
  }

  buildPaymentUrl(params: CreatePayment) {
    const { baseUrl, version } = this.config;
    const {
      locale,
      currCode,
      txnRef,
      orderInfo,
      orderType,
      amount,
      returnUrl,
      ipAddress,
      createDate,
      expireDate,
      bankCode,
      hashSecret,
      tmnCode,
    } = params;
    const searchParams = buildSearchParams({
      vnp_Version: version,
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createDate,
      vnp_ExpireDate: expireDate,
      vnp_BankCode: bankCode,
    });

    const paymentUrl = new URL(PAYMENT_ENDPOINT, baseUrl);
    searchParams.forEach((value, key) => {
      paymentUrl.searchParams.set(key, value);
    });

    const signed = generateSecureHash(paymentUrl.search.slice(1), hashSecret);
    paymentUrl.searchParams.set("vnp_SecureHash", signed);
    return paymentUrl;
  }

  verifyIpnParams(query: IpnParams, secret: string) {
    const { vnp_SecureHash, vnp_SecureHashType, ...rest } = query;
    const params = buildSearchParams(rest);
    const secureHash = generateSecureHash(params.toString(), secret);
    return vnp_SecureHash === secureHash;
  }

  async refund(query: RefundPayment) {
    const { baseUrl, version } = this.config;
    const {
      txnRef,
      tmnCode,
      transactionDate,
      transactionNo,
      transactionType,
      amount,
      createBy,
      createDate,
      ipAddress,
      orderInfo,
      requestId,
      hashSecret,
    } = query;
    const command = "refund";
    const body: RefundParams = {
      vnp_Version: version || DEFAULT_VERSION,
      vnp_Command: command,
      vnp_TxnRef: txnRef,
      vnp_TmnCode: tmnCode,
      vnp_TransactionDate: transactionDate,
      vnp_TransactionType: transactionType,
      vnp_TransactionNo: transactionNo,
      vnp_Amount: amount,
      vnp_CreateBy: createBy,
      vnp_RequestId: requestId,
      vnp_OrderInfo: orderInfo,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createDate,
    };
    body.vnp_SecureHash = generateSecureHash(
      requestId +
        "|" +
        version +
        "|" +
        command +
        "|" +
        tmnCode +
        "|" +
        transactionType +
        "|" +
        txnRef +
        "|" +
        amount +
        "|" +
        transactionNo +
        "|" +
        transactionDate +
        "|" +
        createBy +
        "|" +
        createDate +
        "|" +
        ipAddress +
        "|" +
        orderInfo,
      hashSecret
    );

    const response = await axios.post(`${baseUrl}/${REFUND_ENDPOINT}`, body);
    return response.data;
  }
}
