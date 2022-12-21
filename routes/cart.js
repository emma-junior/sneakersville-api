import express from "express";
import {
  getAllUserCart,
  getUserCart,
  deleteCart,
  updateCart,
  addCart,
} from "../controllers/cart.js";

const router = express.Router();

router.get("/:id", getUserCart);
router.get("/", getAllUserCart);
router.post("/", addCart);
router.delete("/:id", deleteCart);
router.put("/:id", updateCart);

export default router;
