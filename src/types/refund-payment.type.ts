import { RefundPayType } from "../constants";

export type RefundPayment = {
  requestId: string;
  tmnCode: string;
  transactionType: RefundPayType;
  txnRef: string;
  amount: number;
  transactionNo: string;
  createBy: string;
  orderInfo: string;
  transactionDate: string;
  createDate: string;
  ipAddress: string;
  hashSecret: string;
};

export type RefundParams = {
  /**
   * Phiên bản api mà merchant kết nối.
   * Phiên bản hiện tại là 2.1.0
   */
  vnp_Version: string;
  /**
   * Mã API sử dụng
   * Mã cho giao dịch thanh toán là "refund"
   */
  vnp_Command: string;
  /**
   * Mã hệ thống merchant tự sinh ứng với mỗi yêu cầu truy vấn giao dịch.
   * Mã này là duy nhất dùng để phân biệt các yêu cầu truy vấn giao dịch. Không được trùng lặp trong ngày.
   */
  vnp_RequestId: string;
  /**
   * Mã định danh kết nối của merchant trên hệ thống VNPAY.
   * Các mã định danh kết nối tương ứng giữa các hệ thống:
   * Thanh toán PAY được quy định tại tham số "vnp_TmnCode"
   * Thanh toán bằng mã Tokenđược quy định tại tham số "vnp_tmn_code"
   * Thanh toán trả gópđược quy định tại tham số "tmnCode"
   * Thanh toán định kỳđược quy định tại tham số "tmnCode"
   */
  vnp_TmnCode: string;
  /**
   * Loại giao dịch tại hệ thống VNPAY:
   * 02: Giao dịch hoàn trả toàn phần (vnp_TransactionType=02)
   * 03: Giao dịch hoàn trả một phần (vnp_TransactionType=03)
   */
  vnp_TransactionType: RefundPayType;
  /**
   * Là mã giao dịch thanh toán của hệ thống merchant gửi VNPAY yêu cầu thanh toán.
   * Tham khảo các giá trị qua các hệ thống thanh toán:
   * Thanh toán PAY được quy định tại tham số "vnp_TxnRef"
   * Thanh toán bằng mã Token được quy định tại tham số "vnp_txn_ref"
   * Thanh toán trả góp được quy định tại tham số "order": {"orderReference": ""} chiều khởi tạo giao dịch trả góp
   * Thanh toán định kỳ được quy định tại tham số "order": {"orderReference": ""} chiều yêu cầu thanh toán định kỳ
   */
  vnp_TxnRef: string;
  /**
   * Số tiền hoàn trả lại cho khách hàng. Số tiền này nhỏ hơn hoặc bằng số tiền của giao dịch Tham khảo các giá trị qua các hệ thống thanh toán:
   * Thanh toán PAY được quy định tại tham số "vnp_Amount"
   * Thanh toán bằng mã Tokenđược quy định tại tham số "vnp_amount"
   * Thanh toán trả góp được quy định tại tham số "transaction": {"totalIspAmount": ""} chiều khởi tạo giao dịch trả góp và "vnp_Amount" chiều VNPAY phản hồi kết quả thanh toán
   * Thanh toán định kỳ được quy định tại tham số "transaction": {"recurringAmount": ""} chiều yêu cầu thanh toán định kỳ và "vnp_amount" chiêu VNPAY phản hồi kết quả thanh toán
   */
  vnp_Amount: number;
  /**
   * Mã giao dịch ghi nhận tại hệ thống VNPAY
   */
  vnp_TransactionNo: string;
  /**
   * Người khởi tạo hoàn tiền. Có thể là tên user thực hiện hoàn tiền của merchant.
   */
  vnp_CreateBy: string;
  /**
   * Mô tả thông tin yêu cầu hoàn( Request description)
   */
  vnp_OrderInfo: string;
  /**
   * Thời gian ghi nhận giao dịch tại website của merchant tính theo GMT+7, định dạng: yyyyMMddHHmmss, tham khảo giá trị:
   * Thanh toán PAY giống vnp_CreateDate của vnp_Command=pay
   * Thanh toán bằng mã Tokengiống "vnp_create_date" của "vnp_Command=pay_and_create" và "vnp_command=token_pay"
   * Thanh toán trả góp giống "transaction": {"mcDate": ""} chiều khởi tạo giao dịch trả góp
   * Thanh toán định kỳ giống "transaction": {"mcDate": ""} chiều khởi tạo yêu cầu thanh toán định kỳ
   */
  vnp_TransactionDate: string;
  /**
   * Thời gian phát sinh request hoàn (Request Date) GMT+7, định dạng: yyyyMMddHHmmss
   */
  vnp_CreateDate: string;
  /**
   * Địa chỉ IP của máy chủ thực hiện gọi API
   */
  vnp_IpAddr: string;
  /**
   * Mã kiểm tra (checksum) để đảm bảo dữ liệu không bị thay đổi trong quá trình gửi yêu cầu tử hệ thống merchant sang VNPAY.
   * Quy tắc tạo checksum:
   * data = vnp_RequestId
   * + "|" + vnp_Version + "|" + vnp_Command
   * + "|" + vnp_TmnCode + "|" + vnp_TransactionType
   * + "|" + vnp_TxnRef + "|" + vnp_Amount
   * + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate
   * + "|" + vnp_CreateBy + "|" + vnp_CreateDate
   * + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
   * checksum = hashWithSecureType(secretKey, data);
   */
  vnp_SecureHash?: string;
};
