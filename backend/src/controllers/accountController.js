// backend/src/controllers/accountController.js
import Account from "../models/Account.js";

// Helper: chuẩn hoá mảng images (nhận string hoặc array)
function normalizeImages(raw) {
  if (!raw) return [];

  // Nếu là array sẵn
  if (Array.isArray(raw)) {
    return raw.map((x) => String(x).trim()).filter(Boolean);
  }

  // Nếu là string (ví dụ textarea xuống dòng)
  if (typeof raw === "string") {
    return raw
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  return [];
}

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
// Frontend gửi: { title, rank, description, mainImage, images, server, section }
export const createAccount = async (req, res) => {
  try {
    console.log("👉 createAccount body:", req.body);

    const {
      title,
      rank,
      description,
      mainImage,
      images,
      server,
      section,
    } = req.body;

    // Validate dữ liệu bắt buộc
    if (!title || !mainImage || !server || !section) {
      return res.status(400).json({
        message: "Thiếu dữ liệu bắt buộc",
        missing: {
          title: !!title,
          mainImage: !!mainImage,
          server: !!server,
          section: !!section,
        },
      });
    }

    const normalizedImages = normalizeImages(images);

    const newAcc = await Account.create({
      title,
      rank,
      description,
      mainImage,
      images: normalizedImages,
      server,
      section,
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
      title,
      rank,
      description,
      mainImage,
      images,
      server,
      section,
    } = req.body;

    const acc = await Account.findById(id);
    if (!acc) return res.status(404).json({ message: "Account not found" });

    if (title !== undefined) acc.title = title;
    if (rank !== undefined) acc.rank = rank;
    if (description !== undefined) acc.description = description;
    if (mainImage !== undefined) acc.mainImage = mainImage;
    if (server !== undefined) acc.server = server;
    if (section !== undefined) acc.section = section;

    // Chỉ update images nếu FE gửi lên field images
    if (images !== undefined) {
      acc.images = normalizeImages(images);
    }

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
