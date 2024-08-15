export type VnpayConfig = {
  /**
   * VNPAY base url
   */
  baseUrl?: string;
  /**
   * Phiên bản api mà merchant kết nối.
   * Phiên bản hiện tại là : 2.1.0
   */
  version?: string;
  /**
   * Mã API sử dụng
   * Mã cho giao dịch thanh toán là: pay
   */
  command?: string;
};
