import express from "express";
import {
  getProducts,
  createProducts,
  getDetails,
  deleteProducts,
  updateProducts,
} from "../controllers/products.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);
router.get("/:id", getDetails);

export default router;
