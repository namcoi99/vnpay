import express, { type Request, type Response } from "express";
import { VnpayClient } from "../src/vnpay-client";
import { VnpayLocale } from "../src/constants";
import dotenv from "dotenv";
dotenv.config();
const { TMN_CODE, HASH_SECRET } = process.env;

const app = express();
const port = 3000;
const vnpayClient = new VnpayClient({});

app.get("/ping", (req: Request, res: Response) => {
  return res.send("pong");
});

app.get("/payment-url", async (req: Request, res: Response) => {
  const paymentUrl = vnpayClient.buildPaymentUrl({
    amount: 100000,
    createDate: "20240815150630",
    currCode: "VND",
    ipAddress: "192.168.1.120",
    locale: VnpayLocale.VN,
    orderInfo: "Thanh toan cho ma GD: 12345",
    orderType: "other",
    returnUrl: "localhost:5000/ipn-url",
    expireDate: "20240815160000",
    txnRef: "12345",
    tmnCode: TMN_CODE || "",
    secureHash: HASH_SECRET || "",
  });
  return res.json({ paymentUrl });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
