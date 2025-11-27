// backend/src/controllers/accountController.js
import Account from "../models/Account.js";

// GET /api/accounts?server=&section=
export const getAccounts = async (req, res) => {
  try {
    const { server, section } = req.query;
    const filter = {};

    if (server) filter.server = server;
    if (section) filter.section = section;

    const accounts = await Account.find(filter).sort({ createdAt: -1 });
    res.json(accounts);
  } catch (err) {
    console.error("getAccounts error:", err);
    res.status(500).json({ message: "Lỗi khi lấy danh sách account" });
  }
};

// GET /api/accounts/:id
export const getAccountById = async (req, res) => {
  try {
    const acc = await Account.findById(req.params.id);
    if (!acc) return res.status(404).json({ message: "Account not found" });
    res.json(acc);
  } catch (err) {
    console.error("getAccountById error:", err);
    res.status(500).json({ message: "Lỗi khi lấy account" });
  }
};

// POST /api/accounts (ADMIN)
export const createAccount = async (req, res) => {
  try {
    // Log để debug xem frontend gửi gì
    console.log("👉 createAccount body:", req.body);

    // Dữ liệu “đúng chuẩn”
    const {
      name,
      server,
      section,
      price,
      description,
      thumbnailUrl,
      bannerGifUrl,
      galleryImages,
      isFeatured,
    } = req.body;

    // Dữ liệu kiểu cũ từ form admin (những field có khả năng tồn tại)
    const legacyTitle = req.body.title;          // tiêu đề
    const legacyServer = req.body.server;        // server chọn trong form
    const legacySection = req.body.section;      // danh mục: character / fashion
    const legacyPrice = req.body.rankPrice;      // hoặc price kiểu string
    const legacyInfo = req.body.info;            // mô tả
    const legacyMainImg = req.body.mainImageUrl; // link ảnh chính sau upload
    const legacyImages = req.body.images;        // mảng link ảnh phụ

    // Gộp lại – ưu tiên field mới, fallback sang field cũ
    const finalName = name || legacyTitle || "No title";
    const finalServer = server || legacyServer || "los-santos";
    const finalSection = section || legacySection || "character";

    let finalPrice = price;
    if (finalPrice == null && legacyPrice != null) {
      const p = Number(legacyPrice);
      finalPrice = Number.isNaN(p) ? 0 : p;
    }

    const finalDescription = description || legacyInfo || "";
    const finalThumbnailUrl = thumbnailUrl || legacyMainImg || "";
    const finalBannerGifUrl = bannerGifUrl || "";
    const finalGalleryImages =
      Array.isArray(galleryImages) && galleryImages.length > 0
        ? galleryImages
        : Array.isArray(legacyImages)
        ? legacyImages
        : [];

    const finalIsFeatured = typeof isFeatured === "boolean" ? isFeatured : false;

    // Nếu vẫn thiếu thì trả về 400 (Bad Request) cho dễ hiểu, không phải 500
    if (!finalName || !finalServer || !finalSection || finalPrice == null) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc",
        missing: {
          name: !!finalName,
          server: !!finalServer,
          section: !!finalSection,
          price: finalPrice != null,
        },
      });
    }

    const newAcc = await Account.create({
      name: finalName,
      server: finalServer,
      section: finalSection,
      price: finalPrice,
      description: finalDescription,
      thumbnailUrl: finalThumbnailUrl,
      bannerGifUrl: finalBannerGifUrl,
      galleryImages: finalGalleryImages,
      isFeatured: finalIsFeatured,
    });

    res.status(201).json(newAcc);
  } catch (err) {
    console.error("createAccount error:", err);
    res.status(500).json({ message: "Lỗi khi tạo account" });
  }
};

// PUT /api/accounts/:id  (ADMIN)
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      server,
      section,
      price,
      description,
      thumbnailUrl,
      bannerGifUrl,
      galleryImages,
      isFeatured,
    } = req.body;

    const acc = await Account.findById(id);
    if (!acc) return res.status(404).json({ message: "Account not found" });

    acc.name = name ?? acc.name;
    acc.server = server ?? acc.server;
    acc.section = section ?? acc.section;
    acc.price = price ?? acc.price;
    acc.description = description ?? acc.description;
    acc.thumbnailUrl = thumbnailUrl ?? acc.thumbnailUrl;
    acc.bannerGifUrl = bannerGifUrl ?? acc.bannerGifUrl;
    acc.galleryImages = galleryImages ?? acc.galleryImages;
    acc.isFeatured = isFeatured ?? acc.isFeatured;

    const updated = await acc.save();
    res.json(updated);
  } catch (err) {
    console.error("updateAccount error:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật account" });
  }
};

// DELETE /api/accounts/:id (ADMIN)
export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Account.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Account not found" });

    res.json({ message: "Account removed" });
  } catch (err) {
    console.error("deleteAccount error:", err);
    res.status(500).json({ message: "Lỗi khi xóa account" });
  }
};
