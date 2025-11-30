import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },     // tên acc
    rank: { type: String },                      // loại / rank
    description: { type: String },               // mô tả
    mainImage: { type: String, required: true }, // ảnh chính
    images: { type: [String], default: [] },     // ảnh phụ
    server: { type: String, required: true },    // los-santos / ...
    section: { type: String, required: true },   // character / fashion
  },
  { timestamps: true }
);

export default mongoose.model("Account", AccountSchema);
