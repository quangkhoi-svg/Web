import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import multer from "multer";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import accountRoutes from "./routes/accountRoutes.js";
import serverRoutes from "./routes/serverRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

/* ============================
   🛡 HELMET: bảo vệ header
============================ */
app.use(helmet());

/* ============================
   🌐 CORS: chỉ cho phép domain tin cậy
============================ */
const allowedOrigins = [
  "http://localhost:5173",                         // dev local (Vite)
  "https://hilarious-sawine-12b798.netlify.app",  // frontend Netlify của bạn
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Request không có origin (Postman, server nội bộ) -> cho phép
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

/* ============================
   🔐 RATE LIMIT: chống spam login
============================ */
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 20, // tối đa 20 lần / 15 phút / IP
  message: "Thử đăng nhập quá nhiều, vui lòng thử lại sau.",
});

// Áp dụng limiter cho riêng endpoint login
app.use("/api/auth/login", loginLimiter);

/* ============================
   🟩 PHẦN UPLOAD FILE
============================ */

// Tạo thư mục uploads nếu chưa có
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log("📁 Tạo thư mục uploads:", UPLOAD_DIR);
}

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Cho phép truy cập file tĩnh
app.use("/uploads", express.static(UPLOAD_DIR));

/* API upload file */
app.post("/api/upload", upload.single("file"), (req, res) => {
  const fileUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;

  res.json({
    message: "Uploaded OK",
    url: fileUrl,
    mimetype: req.file.mimetype,
  });
});

/* ============================
   🟦 ROUTES CHÍNH
============================ */

app.get("/", (req, res) => {
  res.json({ message: "GTA5VN API running" });
});

app.use("/api/accounts", accountRoutes);
app.use("/api/servers", serverRoutes);
app.use("/api/auth", authRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
