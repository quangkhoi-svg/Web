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

    const newAcc = await Account.create({
      name,
      server,
      section,
      price,
      description: description || "",
      thumbnailUrl: thumbnailUrl || "",
      bannerGifUrl: bannerGifUrl || "",
      galleryImages: galleryImages || [],
      isFeatured: isFeatured || false,
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
