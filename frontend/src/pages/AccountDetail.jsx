// src/pages/AccountDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAccountById } from "../services/api.js";

function AccountDetail() {
  const { id } = useParams();

  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  // viewer phóng to
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchAccountById(id)
      .then((data) => setAccount(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading-text">Đang tải chi tiết…</p>;
  if (!account) return <p>Không tìm thấy tài khoản.</p>;

  const serverName =
    account.server === "los-santos" ? "Los Santos" : "Blaine County";

  const rawExtra = account.images || [];
  const mainImage = account.mainImage || rawExtra[0] || null;
  const subImages = account.mainImage ? rawExtra : rawExtra.slice(1);

  const allImages = mainImage ? [mainImage, ...subImages] : subImages;

  // ⭐ FIX QUAY LẠI ĐÚNG LOCATION
  const backType =
    account.section === "fashion" ? "thoi-trang" : "nhan-vat";

  const backHref = `/gallery?server=${account.server}&type=${backType}`;

  const openViewer = (index) => {
    setViewerIndex(index);
    setIsViewerOpen(true);
    document.body.classList.add("body-no-scroll");
  };

  const closeViewer = () => {
    setIsViewerOpen(false);
    document.body.classList.remove("body-no-scroll");
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setViewerIndex((i) => (i - 1 + allImages.length) % allImages.length);
  };

  const showNext = (e) => {
    e.stopPropagation();
    setViewerIndex((i) => (i + 1) % allImages.length);
  };

  return (
    <section className="detail-section detail-page">
      {/* TITLE + QUAY LẠI */}
      <div className="detail-headerX">
        <div>
          <h2 className="detail-titleX">{account.title}</h2>

          <div className="detail-badgesX">
            <span className="badgeX blue">{serverName}</span>
            {account.section === "character" && (
              <span className="badgeX">Nhân vật</span>
            )}
            {account.section === "fashion" && (
              <span className="badgeX">Thời trang</span>
            )}
            {account.rank && (
              <span className="badgeX gold">Level: {account.rank}</span>
            )}
            <span className="badgeX gray">
              {allImages.length} ảnh trưng bày
            </span>
          </div>
        </div>

        <Link to={backHref} className="back-btnX">
          ← Quay lại Bộ sưu tập
        </Link>
      </div>

      {/* INFO + MAIN IMAGE */}
      <div className="detail-mainX">
        {/* KHUNG INFO */}
        <div className="gta-panel">
          <h3 className="gta-panel-title">Thông tin tài khoản</h3>
          <p className="gta-panel-sub">
            Chi tiết mô tả đầy đủ của tài khoản này.
          </p>

          <div className="gta-info-grid">
            <div className="rowX">
              <span>Game</span> <b>{account.game || "GTA5VN"}</b>
            </div>
            <div className="rowX">
              <span>Server</span> <b>{serverName}</b>
            </div>
            <div className="rowX">
              <span>Danh mục</span>
              <b>
                {account.section === "fashion"
                  ? "Thời trang"
                  : account.section === "character"
                  ? "Nhân vật"
                  : "Không rõ"}
              </b>
            </div>
            <div className="rowX">
              <span>Level</span> <b>{account.rank || "Không có"}</b>
            </div>
          </div>

          {account.description && (
            <>
              <h4 className="gta-panel-title small">Mô tả</h4>
              <p className="gta-panel-content">{account.description}</p>
            </>
          )}

          <p className="detail-disclaimerX">
            Đây là tài khoản trưng bày, không bán và không hỗ trợ giao dịch.
          </p>
        </div>

        {/* MAIN IMAGE */}
        {mainImage && (
          <div className="main-imageX" onClick={() => openViewer(0)}>
            <img src={mainImage} alt="Main" />
          </div>
        )}
      </div>

      {/* SUB GALLERY */}
      <div className="gta-panel gallery-panelX">
        <h3 className="gta-panel-title">Thư viện hình ảnh</h3>

        {subImages.length === 0 ? (
          <p className="emptyX">Không có ảnh phụ.</p>
        ) : (
          <div className="detail-galleryX">
            {subImages.map((url, idx) => {
              const index = (mainImage ? 1 : 0) + idx;
              return (
                <button
                  key={idx}
                  className="thumbX"
                  onClick={() => openViewer(index)}
                >
                  <img src={url} alt="" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* FULLSCREEN VIEWER */}
      {isViewerOpen && (
        <div className="viewerX" onClick={closeViewer}>
          <div
            className="viewer-innerX"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="viewer-closeX" onClick={closeViewer}>
              ✕
            </button>

            {allImages.length > 1 && (
              <>
                <button className="viewer-prevX" onClick={showPrev}>
                  ‹
                </button>
                <button className="viewer-nextX" onClick={showNext}>
                  ›
                </button>
              </>
            )}

            <img src={allImages[viewerIndex]} alt="" />

            <div className="viewer-countX">
              {viewerIndex + 1}/{allImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountDetail;
