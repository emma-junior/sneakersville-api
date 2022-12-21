import express from "express";
import {
  deleteUser,
  getAllUser,
  getUser,
  getUserStats,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/stats", getUserStats);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/", getAllUser);

export default router;
