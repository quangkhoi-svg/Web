import express from "express";
import { loginHandler } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", loginHandler);

export default router;
