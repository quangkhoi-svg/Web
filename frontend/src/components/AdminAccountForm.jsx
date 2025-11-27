import { useState, useEffect } from "react";

// 👇 THAY 2 HẰNG NÀY BẰNG CLOUDINARY CỦA BẠN
const CLOUDINARY_CLOUD_NAME = "dtpfnuobs";
const CLOUDINARY_UPLOAD_PRESET = "gta5vn"; // đúng tên preset bạn tạo

// hàm upload 1 file lên Cloudinary, trả về URL
async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload thất bại");
  }

  const data = await res.json();
  return data.secure_url; // link ảnh
}

function AdminAccountForm({ onSubmit, initialData, submitLabel }) {
  const [server, setServer] = useState("los-santos");
  const [section, setSection] = useState("character");

  // 3 field chung, đổi meaning theo section
  const [title, setTitle] = useState("");
  const [rank, setRank] = useState("");
  const [description, setDescription] = useState("");

  // ⭐ ẢNH
  const [mainImage, setMainImage] = useState(""); // ảnh chính (1 link)
  const [extraImages, setExtraImages] = useState(""); // ảnh phụ (textarea, mỗi dòng 1 link)

  // trạng thái loading khi upload
  const [mainUploading, setMainUploading] = useState(false);
  const [extraUploading, setExtraUploading] = useState(false);

  const isCharacter = section === "character";
  const isFashion = section === "fashion";

  useEffect(() => {
    if (initialData) {
      setServer(initialData.server || "los-santos");
      setSection(initialData.section || "character");
      setTitle(initialData.title || "");
      setRank(initialData.rank || "");
      setDescription(initialData.description || "");
      setMainImage(initialData.mainImage || "");
      setExtraImages((initialData.images || []).join("\n"));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const imagesArray = extraImages
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    onSubmit({
      server,
      section,
      title,
      rank,
      description,
      mainImage, // gửi ảnh chính
      images: imagesArray, // gửi danh sách ảnh phụ
    });

    if (!initialData) {
      setTitle("");
      setRank("");
      setDescription("");
      setMainImage("");
      setExtraImages("");
    }
  };

  // ==== HANDLER UPLOAD ẢNH ====

  const handleMainFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setMainUploading(true);
      const url = await uploadToCloudinary(file);
      setMainImage(url);
    } catch (err) {
      console.error(err);
      alert("Upload ảnh chính thất bại");
    } finally {
      setMainUploading(false);
    }
  };

  // chọn từng ảnh phụ một
  const handleExtraFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setExtraUploading(true);

      const url = await uploadToCloudinary(file);

      setExtraImages((prev) => {
        const current = prev
          .split("\n")
          .map((x) => x.trim())
          .filter(Boolean);
        return [...current, url].join("\n");
      });

      // reset input
      e.target.value = "";
    } catch (err) {
      console.error(err);
      alert("Upload ảnh phụ thất bại");
    } finally {
      setExtraUploading(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Server</label>
        <select value={server} onChange={(e) => setServer(e.target.value)}>
          <option value="los-santos">Los Santos</option>
          <option value="blaine-county">Blaine County</option>
        </select>
      </div>

      <div className="form-group">
        <label>Danh mục</label>
        <select value={section} onChange={(e) => setSection(e.target.value)}>
          <option value="character">Nhân vật</option>
          <option value="fashion">Thời trang</option>
        </select>
      </div>

      {/* ====== FIELDS TUỲ THEO DANH MỤC ====== */}

      {/* Tên nhân vật / Tên vật phẩm */}
      <div className="form-group">
        <label>{isCharacter ? "Tên nhân vật" : "Tên vật phẩm"}</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder={
            isCharacter
              ? "VD: CRE Tý, BABY Linh..."
              : "VD: Outfit xanh neon, Set đồ party..."
          }
        />
      </div>

      {/* Level / Danh mục trang phục */}
      <div className="form-group">
        <label>
          {isCharacter ? "Level" : "Danh mục trang phục (Áo / Quần / Mặt nạ...)"}
        </label>

        {isCharacter ? (
          <input
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            placeholder="VD: Level 50, 120h, Rank BOSS..."
          />
        ) : (
          <select
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Áo">Áo</option>
            <option value="Quần">Quần</option>
            <option value="Mặt nạ">Mặt nạ</option>
            <option value="Full set">Full set</option>
          </select>
        )}
      </div>

      {/* Thông tin nhân vật / Mô tả set đồ */}
      <div className="form-group">
        <label>
          {isCharacter ? "Thông tin" : "Mô tả set đồ / vật phẩm"}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder={
            isCharacter
              ? "VD: Nhân vật main, nhiều xe, nhiều nhà, lịch sử chơi..."
              : "VD: Set đồ chụp tại bãi biển, concept màu tím, hợp chụp lookbook..."
          }
        />
      </div>

      {/* ==== ẢNH CHÍNH ==== */}
      <div className="form-group">
        <label>Ảnh chính (chọn từ máy)</label>
        <input type="file" accept="image/*" onChange={handleMainFileChange} />

        {mainUploading && <small>Đang upload ảnh chính...</small>}

        {mainImage && !mainUploading && (
          <div className="admin-image-preview">
            <img
              src={mainImage}
              alt="Ảnh chính"
              style={{ width: "100%", borderRadius: "0.5rem", marginTop: 8 }}
            />
            <small style={{ display: "block", marginTop: 4, opacity: 0.7 }}>
              {mainImage}
            </small>
          </div>
        )}
      </div>

      {/* ==== ẢNH PHỤ ==== */}
      <div className="form-group">
        <label>Ảnh phụ (chọn từng ảnh một)</label>
        <input type="file" accept="image/*" onChange={handleExtraFileChange} />
        {extraUploading && <small>Đang upload ảnh phụ...</small>}
        <small style={{ display: "block", marginTop: 4, opacity: 0.7 }}>
          Chọn một ảnh → chờ upload xong → chọn tiếp ảnh khác.
        </small>
      </div>

      <div className="form-group">
        <label>Danh sách link ảnh phụ (tự fill sau khi upload)</label>
        <textarea
          value={extraImages}
          onChange={(e) => setExtraImages(e.target.value)}
          rows={4}
          placeholder="Mỗi dòng 1 link ảnh..."
        />
      </div>

      <button className="btn-primary" type="submit">
        {submitLabel || "Lưu"}
      </button>
    </form>
  );
}

export default AdminAccountForm;
