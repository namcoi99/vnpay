export enum BankCode {
  /**
   * Thanh toán quét mã QR
   */
  VNPAYQR = "VNPAYQR",
  /**
   * Thẻ ATM - Tài khoản ngân hàng nội địa
   */
  VNBANK = "VNBANK",
  /**
   * Thẻ thanh toán quốc tế
   */
  INTCARD = "INTCARD",
}

export enum VnpayLocale {
  VN = "vn",
  EN = "en",
}

export const SANDBOX_BASE_URL = "https://sandbox.vnpayment.vn";
export const DEFAULT_VERSION = "2.1.0";
export const PAYMENT_ENDPOINT = "paymentv2/vpcpay.html";
