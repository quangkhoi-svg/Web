// src/pages/Gallery.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAccounts } from "../services/api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import AccountCard from "../components/AccountCard.jsx";

function Gallery() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fashionFilter, setFashionFilter] = useState(""); // ⭐ Lọc theo Áo/Quần/Mặt nạ/Full set

  const location = useLocation();
  const navigate = useNavigate();
  const search = new URLSearchParams(location.search);

  // server: los-santos | blaine-county
  const server = search.get("server");

  // type: nhan-vat | thoi-trang
  const type = search.get("type");

  // Nếu có server nhưng thiếu type → mặc định nhan-vat
  useEffect(() => {
    if (server && !type) {
      search.set("type", "nhan-vat");
      navigate(`/gallery?${search.toString()}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server, type]);

  // Map type → section trong database
  const section =
    type === "nhan-vat" ? "character" :
    type === "thoi-trang" ? "fashion" :
    null;

  // Fetch data theo server + section
  useEffect(() => {
    const params = [];

    if (server) params.push(`server=${server}`);
    if (section) params.push(`section=${section}`);

    const query = params.length ? `?${params.join("&")}` : "";

    setLoading(true);
    fetchAccounts(query)
      .then(setAccounts)
      .catch((err) => console.error("Fetch accounts error:", err))
      .finally(() => setLoading(false));

    // Reset filter khi đổi tab
    setFashionFilter("");
  }, [server, section]);

  if (loading) {
    return (
      <section>
        <SectionTitle
          title="Đang tải bộ sưu tập..."
          subtitle="Vui lòng chờ trong giây lát."
        />
      </section>
    );
  }

  // =============================================
  //       BUILD TITLE + SUBTITLE
  // =============================================

  let serverLabel = "";
  if (server === "los-santos") serverLabel = "Los Santos";
  else if (server === "blaine-county") serverLabel = "Blaine County";
  else serverLabel = "Tất cả server";

  let categoryLabel = "";
  if (type === "nhan-vat") categoryLabel = " – Nhân vật";
  else if (type === "thoi-trang") categoryLabel = " – Thời trang";

  const title = `Bộ sưu tập ${serverLabel}${categoryLabel}`;

  let subtitle = "Các acc chỉ dùng để trưng bày. Mỗi acc là một khung riêng.";

  if (type === "nhan-vat") {
    subtitle = "Danh mục Nhân vật – các acc trưng bày nhân vật chính trong server.";
  } else if (type === "thoi-trang") {
    subtitle = "Danh mục Thời trang – các outfit, trang phục được chụp trong game.";
  }

  // =============================================
  //       FILTER LIST
  // =============================================
  const filteredAccounts = accounts.filter((acc) => {
    // ❌ Không phải thời trang → không lọc theo rank
    if (type !== "thoi-trang") return true;

    // ❌ Chưa chọn filter → hiển thị tất cả thời trang
    if (!fashionFilter) return true;

    // ✔ Lọc theo rank (Áo / Quần / Mặt nạ / Full set)
    return acc.rank === fashionFilter;
  });

  // =============================================
  //       RENDER
  // =============================================
  return (
    <section>
      <SectionTitle title={title} subtitle={subtitle} />

      {/* TABS CHUYỂN DANH MỤC */}
      <div className="gallery-tabs">
        <button
          className={`gallery-tab ${type === "nhan-vat" ? "active" : ""}`}
          onClick={() => navigate(`?server=${server}&type=nhan-vat`)}
        >
          Nhân vật
        </button>

        <button
          className={`gallery-tab ${type === "thoi-trang" ? "active" : ""}`}
          onClick={() => navigate(`?server=${server}&type=thoi-trang`)}
        >
          Thời trang
        </button>
      </div>

      {/* ⭐ BỘ LỌC CHI TIẾT CHO THỜI TRANG */}
      {type === "thoi-trang" && (
        <div className="gallery-filter">
          <select
            value={fashionFilter}
            onChange={(e) => setFashionFilter(e.target.value)}
            className="gallery-filter-select"
          >
            <option value="">-- Chọn danh mục --</option>
            <option value="Áo">Áo</option>
            <option value="Quần">Quần</option>
            <option value="Mặt nạ">Mặt nạ</option>
            <option value="Full set">Full set</option>
          </select>
        </div>
      )}

      {/* DANH SÁCH ITEM */}
      {filteredAccounts.length === 0 ? (
        <p style={{ marginTop: "1rem" }}>Không tìm thấy trang phục phù hợp.</p>
      ) : (
        <div className="gallery-grid">
          {filteredAccounts.map((acc) => (
            <AccountCard key={acc.id} account={acc} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Gallery;
