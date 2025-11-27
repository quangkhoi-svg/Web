import express from "express";
import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/accountController.js";

import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

// PUBLIC
router.get("/", getAccounts);
router.get("/:id", getAccountById);

// ADMIN ONLY
router.post("/", requireAdmin, createAccount);
router.put("/:id", requireAdmin, updateAccount);
router.delete("/:id", requireAdmin, deleteAccount);

export default router;
