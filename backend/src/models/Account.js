// backend/src/models/Account.js
import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    // Tên acc hiển thị
    name: { type: String, required: true },

    // Server: "los-santos" | "blaine" | ...
    server: { type: String, required: true },

    // Section: "character" | "fashion" | ...
    section: { type: String, required: true },

    // Giá
    price: { type: Number, required: true },

    // Mô tả chi tiết
    description: { type: String },

    // Ảnh thumbnail (card)
    thumbnailUrl: { type: String },

    // GIF banner
    bannerGifUrl: { type: String },

    // Gallery ảnh
    galleryImages: [{ type: String }],

    // Acc nổi bật
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Account", AccountSchema);
