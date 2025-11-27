import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    // Tên acc hiển thị trên web
    name: { type: String, required: true },

    // Server: "los-santos" | "blaine" | ...
    server: { type: String, required: true },

    // Section: "character" | "fashion" | ...
    section: { type: String, required: true },

    // Giá
    price: { type: Number, required: true },

    // Mô tả chi tiết
    description: { type: String },

    // Ảnh thumbnail (jpg/png) – hiện trên card
    thumbnailUrl: { type: String },

    // GIF banner lớn (động)
    bannerGifUrl: { type: String },

    // Danh sách ảnh khác (nếu bạn muốn gallery)
    galleryImages: [{ type: String }],

    // Acc nổi bật?
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Account", AccountSchema);
