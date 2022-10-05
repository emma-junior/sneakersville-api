import express from "express";
import { getProducts, createProducts, getDetails } from "../controllers/products.js";
import { getCart, addCart, incQty, decQty, delCart } from "../controllers/cart.js";

const router = express.Router()

router.get("/", getProducts);
router.post("/", createProducts)
router.get("/details/:id", getDetails)
router.get("/cart", getCart);
router.post("/cart", addCart);
router.delete("/cart/:id", delCart);
router.patch("/cart/:id/incQty", incQty);
router.patch("/cart/:id/decQty", decQty);

export default router;