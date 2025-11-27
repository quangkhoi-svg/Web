// src/routes/authRoutes.js
import express from "express";

const router = express.Router();

// Tài khoản admin cố định
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
// Token trùng với trên frontend đang dùng
const ADMIN_TOKEN = "gta5vn-gallery-token";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // check đơn giản
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN });
  }

  return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
});

export default router;
