import { BankCode, VnpayLocale } from "../constants";

export type CreatePayment = {
  /**
   * Số tiền thanh toán.
   * Số tiền không mang các ký tự phân tách thập phân, phần nghìn, ký tự tiền tệ.
   * Để gửi số tiền thanh toán là 10,000 VND (mười nghìn VNĐ)
   * thì merchant cần nhân thêm 100 lần (khử phần thập phân),
   * sau đó gửi sang VNPAY là: 1000000
   */
  amount: number;
  /**
   * Mã phương thức thanh toán, mã loại ngân hàng hoặc ví điện tử thanh toán.
   * Nếu không gửi sang tham số này, chuyển hướng người dùng sang VNPAY chọn phương thức thanh toán.
   */
  bankCode?: BankCode;
  /**
   * Là thời gian phát sinh giao dịch định dạng yyyyMMddHHmmss (Time zone GMT+7)
   * Ví dụ: 20220101103111
   */
  createDate: string;
  /**
   * Đơn vị tiền tệ sử dụng thanh toán. Hiện tại chỉ hỗ trợ VND
   */
  currCode: string;
  /**
   * Địa chỉ IP của khách hàng thực hiện giao dịch. Ví dụ: 13.160.92.202
   */
  ipAddress: string;
  /**
   * Ngôn ngữ giao diện hiển thị.
   * Hiện tại hỗ trợ Tiếng Việt (vn), Tiếng Anh (en)
   */
  locale: VnpayLocale;
  /**
   * Thông tin mô tả nội dung thanh toán quy định dữ liệu gửi sang VNPAY (Tiếng Việt không dấu và không bao gồm các ký tự đặc biệt)
   * Ví dụ: Nap tien cho thue bao 0123456789. So tien 100,000 VND
   */
  orderInfo: string;
  /**
   * Mã danh mục hàng hóa.
   * Mỗi hàng hóa sẽ thuộc một nhóm danh mục do VNPAY quy định.
   */
  orderType: string;
  /**
   * URL thông báo kết quả giao dịch khi Khách hàng kết thúc thanh toán.
   * Ví dụ: https://domain.vn/VnPayReturn
   */
  returnUrl: string;
  /**
   * Thời gian hết hạn thanh toán GMT+7, định dạng: yyyyMMddHHmmss
   */
  expireDate: string;
  /**
   * Mã tham chiếu của giao dịch tại hệ thống của merchant.
   * Mã này là duy nhất dùng để phân biệt các đơn hàng gửi sang VNPAY. Không được trùng lặp trong ngày.
   * Ví dụ: 23554
   */
  txnRef: string;
  /**
   * Mã website của merchant trên hệ thống của VNPAY.
   * Ví dụ: 2QXUI4J4
   */
  tmnCode: string;
  /**
   * Mã kiểm tra (checksum) để đảm bảo dữ liệu của giao dịch không bị thay đổi trong quá trình chuyển từ merchant sang VNPAY.
   * Việc tạo ra mã này phụ thuộc vào cấu hình của merchant và phiên bản api sử dụng.
   * Phiên bản hiện tại hỗ trợ SHA256, HMACSHA512.
   */
  secureHash: string;
};
