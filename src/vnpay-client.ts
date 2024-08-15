import {
  DEFAULT_COMMAND,
  DEFAULT_VERSION,
  PAYMENT_ENDPOINT,
  SANDBOX_BASE_URL,
} from "./constants";
import { CreatePayment, IpnParams, VnpayConfig } from "./types";
import { buildSearchParams, generateSecureHash } from "./utils";

export class VnpayClient {
  config: VnpayConfig;

  constructor({
    baseUrl = SANDBOX_BASE_URL,
    version = DEFAULT_VERSION,
    command = DEFAULT_COMMAND,
    ...rest
  }: VnpayConfig) {
    this.config = {
      baseUrl,
      version,
      command,
      ...rest,
    };
  }

  buildPaymentUrl(params: CreatePayment) {
    const { baseUrl, version, command } = this.config;
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
      secureHash,
      tmnCode,
    } = params;
    const searchParams = buildSearchParams({
      vnp_Version: version,
      vnp_Command: command,
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

    const signed = generateSecureHash(paymentUrl.search.slice(1), secureHash);
    paymentUrl.searchParams.set("vnp_SecureHash", signed);
    return paymentUrl;
  }

  verifyIpnParams(query: IpnParams, secret: string) {
    const { vnp_SecureHash, vnp_SecureHashType, ...rest } = query;
    const params = buildSearchParams(rest);
    const secureHash = generateSecureHash(params.toString(), secret);
    return vnp_SecureHash === secureHash;
  }
}
