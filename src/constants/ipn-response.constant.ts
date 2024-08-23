export enum IpnResponseCode {
  /**
   * Success
   */
  SUCCESS = "00",
  /**
   * Order not found
   */
  ORDER_NOT_FOUND = "01",
  /**
   * This order has been updated to the payment status
   */
  ALREADY_UPDATED = "02",
  /**
   * Amount invalid
   */
  AMOUNT_INVALID = "04",
  /**
   * Checksum failed
   */
  CHECKSUM_INVALID = "97",
  /**
   * Internal server error
   */
  INTERNAL_ERROR = "99",
}

export type IpnResponse = {
  RspCode: string;
  Message: string;
};

export const IpnSuccess: IpnResponse = {
  RspCode: "00",
  Message: "Confirm Success",
};

export const IpnOrderNotFound: IpnResponse = {
  RspCode: "01",
  Message: "Order not found",
};

export const InpOrderAlreadyConfirmed: IpnResponse = {
  RspCode: "02",
  Message: "Order already confirmed",
};

export const IpnInvalidAmount: IpnResponse = {
  RspCode: "04",
  Message: "Invalid amount",
};

export const IpnFailChecksum: IpnResponse = {
  RspCode: "97",
  Message: "Fail checksum",
};

export const IpnUnknownError: IpnResponse = {
  RspCode: "99",
  Message: "Unknown error",
};
