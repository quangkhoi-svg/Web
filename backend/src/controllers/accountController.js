// backend/src/controllers/accountController.js
import Account from "../models/Account.js";

/**
 * GET /api/accounts?server=&section=
 * Lấy danh sách account (có filter theo server, section)
 */
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

/**
 * GET /api/accounts/:id
 * Lấy chi tiết 1 account
 */
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

/**
 * POST /api/accounts  (ADMIN)
 * Tạo mới account
 */
// POST /api/accounts (ADMIN)
export const createAccount = async (req, res) => {
  try {
    const body = req.body || {};

    // FE hiện tại đang gửi: title, category, rank, mainImage, images, bannerGif
    const mapped = {
      name: body.name || body.title,               // tiêu đề acc
      server: body.server,                         // server giữ nguyên
      section: body.section || body.category,      // category -> section
      price: body.price ?? body.rank,              // rank -> price (tạm dùng như giá)
      description: body.description || "",
      thumbnailUrl: body.thumbnailUrl || body.mainImage || "",
      bannerGifUrl: body.bannerGifUrl || body.bannerGif || "",
      galleryImages: body.galleryImages || body.images || [],
      isFeatured: body.isFeatured ?? false,
    };

    // Tự validate trước cho rõ lỗi (tránh ValidationError khó hiểu)
    if (!mapped.name || !mapped.server || !mapped.section || mapped.price == null) {
      return res.status(400).json({
        message: "Thiếu trường bắt buộc (name/title, server, section/category, price/rank)",
      });
    }

    const newAcc = await Account.create(mapped);
    res.status(201).json(newAcc);
  } catch (err) {
    console.error("createAccount error:", err);
    res.status(500).json({ message: "Lỗi khi tạo account" });
  }
};


/**
 * PUT /api/accounts/:id  (ADMIN)
 * Cập nhật account
 */
export const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body || {};

    const acc = await Account.findById(id);
    if (!acc) return res.status(404).json({ message: "Account not found" });

    // Cho phép update cả key mới lẫn key cũ
    acc.name = (body.name || body.title) ?? acc.name;
    acc.server = body.server ?? acc.server;
    acc.section = (body.section || body.category) ?? acc.section;
    acc.price = (body.price ?? body.rank) ?? acc.price;
    acc.description = body.description ?? acc.description;
    acc.thumbnailUrl =
      (body.thumbnailUrl || body.mainImage) ?? acc.thumbnailUrl;
    acc.bannerGifUrl =
      (body.bannerGifUrl || body.bannerGif) ?? acc.bannerGifUrl;
    acc.galleryImages = (body.galleryImages || body.images) ?? acc.galleryImages;
    acc.isFeatured = body.isFeatured ?? acc.isFeatured;

    const updated = await acc.save();
    res.json(updated);
  } catch (err) {
    console.error("updateAccount error:", err);
    res.status(500).json({ message: "Lỗi khi cập nhật account" });
  }
};

/**
 * DELETE /api/accounts/:id  (ADMIN)
 * Xoá account
 */
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
