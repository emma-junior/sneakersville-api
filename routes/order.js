import express from "express";
import {
  getAllUserOrder,
  getUserOrder,
  deleteOrder,
  updateOrder,
  createOrder,
  getMonthlyIncome,
} from "../controllers/order.js";

const router = express.Router();

router.get("/income", getMonthlyIncome);
router.get("/:id", getUserOrder);
router.get("/", getAllUserOrder);
router.post("/", createOrder);
router.delete("/:id", deleteOrder);
router.put("/:id", updateOrder);

export default router;
