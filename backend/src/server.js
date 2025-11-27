import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

// ===== CONNECT MONGODB (CHO MONGOOSE V9) =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// ===== START SERVER =====
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend chạy ở http://localhost:${PORT}`);
});
