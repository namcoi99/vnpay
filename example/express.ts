import express, { type Request, type Response } from "express";
import { VnpayClient } from "../src/vnpay-client";
import {
  InpOrderAlreadyConfirmed,
  IpnFailChecksum,
  IpnInvalidAmount,
  IpnOrderNotFound,
  IpnSuccess,
  IpnUnknownError,
  VnpayLocale,
} from "../src/constants";
import dotenv from "dotenv";
import { IpnParams } from "../src/types";
dotenv.config();
const { TMN_CODE, HASH_SECRET } = process.env;

const app = express();
const port = 3000;
const vnpayClient = new VnpayClient({});

app.get("/ping", (req: Request, res: Response) => {
  return res.send("pong");
});

app.get("/payment-url", async (req: Request, res: Response) => {
  const txnRef = Date.now().toString();
  const paymentUrl = vnpayClient.buildPaymentUrl({
    amount: 100000,
    createDate: "20240815150630",
    currCode: "VND",
    ipAddress: "192.168.1.120",
    locale: VnpayLocale.VN,
    orderInfo: `Thanh toan cho ma GD: ${txnRef}`,
    orderType: "other",
    returnUrl: "http://localhost:3000/ipn",
    expireDate: "20240815180000",
    txnRef,
    tmnCode: TMN_CODE || "",
    hashSecret: HASH_SECRET || "",
  });
  return res.json({ paymentUrl });
});

app.get(
  "/ipn",
  async (req: Request<unknown, unknown, unknown, IpnParams>, res: Response) => {
    const isVerified = vnpayClient.verifyIpnParams(
      req.query,
      HASH_SECRET || ""
    );
    if (!isVerified) {
      return res.json(IpnFailChecksum);
    }

    const orderId = req.query.vnp_TxnRef;
    const orderFound = orderId !== "sample-order";
    if (!orderFound) {
      return res.json(IpnOrderNotFound);
    }

    const orderConfirmed = false;
    if (orderConfirmed) {
      return res.json(InpOrderAlreadyConfirmed);
    }

    const isInvalidAmount = false;
    if (isInvalidAmount) {
      return res.json(IpnInvalidAmount);
    }

    const isErrorOccurred = false;
    if (isErrorOccurred) {
      return res.json(IpnUnknownError);
    }

    return res.json(IpnSuccess);
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
