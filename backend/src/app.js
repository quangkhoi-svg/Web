import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import multer from "multer";

import accountRoutes from "./routes/accountRoutes.js";
import serverRoutes from "./routes/serverRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

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
   🟦 END PHẦN UPLOAD FILE
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
