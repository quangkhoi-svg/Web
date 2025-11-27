// src/routes/authRoutes.js
import express from "express";
import { loginHandler } from "../middleware/adminAuth.js";

const router = express.Router();

// chỉ đơn giản gọi loginHandler
router.post("/login", loginHandler);

export default router;
