import { paystackPayment } from "../controllers/paystack.js";
import express from "express";

const router = express.Router();

router.post("/paystack", paystackPayment);

export default router;
