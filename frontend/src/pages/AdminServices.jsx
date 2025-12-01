// src/pages/AdminServices.jsx
import { useState, useEffect } from "react";
import {
  DEFAULT_SERVICES,
  SERVICES_STORAGE_KEY,
} from "../data/servicesConfig";
import "../styles/adminServices.css";

/* ============================
   UPLOAD LÊN BACKEND (VPS / LOCAL)
============================ */

// Hàm upload file lên backend (Node ở port 4000)
async function uploadToServer(file) {
  const fd = new FormData();
  fd.append("file", file);

const res = await fetch("https://api.nhayen.click/api/upload", {
    method: "POST",
    body: fd,
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Upload error:", data);
    alert("Upload lỗi: " + file.name);
    throw new Error("Upload fail");
  }

  // Backend trả về { message, url, mimetype }
  return data;
}

// đọc services từ localStorage
function loadServices() {
  try {
    const raw = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (!raw) return DEFAULT_SERVICES;
    const parsed = JSON.parse(raw);
    return parsed.length ? parsed : DEFAULT_SERVICES;
  } catch {
    return DEFAULT_SERVICES;
  }
}

export default function AdminServices() {
  const [services, setServices] = useState(loadServices);

  // dịch vụ đang được chọn để chỉnh
  const [selected, setSelected] = useState(() => {
    const s = loadServices()[0];
    return {
      ...s,
      demoImages: s.demoImages || [],
      demoVideos: s.demoVideos || [],
    };
  });

  // lưu mọi thay đổi vào localStorage
  useEffect(() => {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  // cập nhật 1 field DEMO của service đang chọn
  // (demoTitle, demoDescription, demoImages, demoVideos)
  const updateService = (field, value) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === selected.id ? { ...s, [field]: value } : s
      )
    );
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  // thêm media: tự nhận biết ảnh / gif / video dựa vào mimetype trả về
  const addMedia = async (file) => {
    const { url, mimetype } = await uploadToServer(file);

    if (mimetype.startsWith("video/") || mimetype === "image/gif") {
      // video + gif
      updateService("demoVideos", [...(selected.demoVideos || []), url]);
    } else {
      // các loại image khác
      updateService("demoImages", [...(selected.demoImages || []), url]);
    }
  };

  const removeImage = (url) => {
    updateService(
      "demoImages",
      (selected.demoImages || []).filter((i) => i !== url)
    );
  };

  const removeVideo = (url) => {
    updateService(
      "demoVideos",
      (selected.demoVideos || []).filter((v) => v !== url)
    );
  };

  const saveAll = () => {
    localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    alert("Đã lưu thay đổi!");
  };

  const resetToDefault = () => {
    if (!window.confirm("Reset tất cả dịch vụ về mặc định?")) return;
    setServices(DEFAULT_SERVICES);
    const first = DEFAULT_SERVICES[0];
    setSelected({
      ...first,
      demoImages: first.demoImages || [],
      demoVideos: first.demoVideos || [],
    });
    localStorage.setItem(
      SERVICES_STORAGE_KEY,
      JSON.stringify(DEFAULT_SERVICES)
    );
  };

  // số liệu tổng quan
  const totalServices = services.length;
  const totalImages = services.reduce(
    (sum, s) => sum + (s.demoImages?.length || 0),
    0
  );
  const totalVideos = services.reduce(
    (sum, s) => sum + (s.demoVideos?.length || 0),
    0
  );
  const totalMedia = totalImages + totalVideos;

  return (
    <section className="admin-page">
      {/* ===== HEADER GIỐNG DASHBOARD ===== */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-section-title">Admin – Quản lý dịch vụ</h1>
          <p className="admin-section-sub">
            Thêm / sửa nội dung demo (ảnh, GIF, video) cho từng dịch vụ
            sẽ hiển thị ngoài trang Dịch vụ.
          </p>
        </div>

        <div className="admin-actions">
          <button className="btn-ghost" type="button" onClick={resetToDefault}>
            Reset về mặc định
          </button>
          <button className="btn-primary" type="button" onClick={saveAll}>
            Lưu tất cả
          </button>
        </div>
      </div>

      {/* ===== TỔNG QUAN HỆ THỐNG ===== */}
      <div className="admin-section">
        <p className="admin-section-title">Tổng quan hệ thống</p>
        <p className="admin-section-sub">
          Số lượng dịch vụ và số media demo bạn đã upload.
        </p>

        <div className="admin-stat-cards">
          <div className="admin-stat-card admin-stat-card--accent">
            <div className="admin-stat-label">Tổng số dịch vụ</div>
            <div className="admin-stat-value">{totalServices}</div>
            <div className="admin-stat-foot">
              Lấy từ cấu hình <code>servicesConfig</code>
            </div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">Tổng ảnh demo</div>
            <div className="admin-stat-value">{totalImages}</div>
            <div className="admin-stat-foot">JPG, PNG… (không tính GIF)</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">Tổng video / GIF</div>
            <div className="admin-stat-value">{totalVideos}</div>
            <div className="admin-stat-foot">File video + ảnh GIF</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">Tổng media demo</div>
            <div className="admin-stat-value">{totalMedia}</div>
            <div className="admin-stat-foot">
              Ảnh + video / GIF của tất cả dịch vụ
            </div>
          </div>
        </div>
      </div>

      {/* ===== KHU VỰC QUẢN LÝ CHÍNH ===== */}
      <div className="admin-section">
        <p className="admin-section-title">
          Quản lý dịch vụ hiển thị ngoài website
        </p>
        <p className="admin-section-sub">
          Chọn một dòng ở bảng bên phải để chỉnh sửa chi tiết ở panel bên
          trái. Mỗi dịch vụ có thể gán nhiều ảnh, GIF hoặc video demo khác nhau.
        </p>

        <div className="admin-layout admin-layout--3cols">
          {/* === 1. FORM CHỈNH SỬA BÊN TRÁI === */}
          <div className="admin-panel">
            <h3 className="admin-panel-title">
              Chỉnh sửa: {selected?.title}
            </h3>
            <p className="admin-panel-desc">
              Nội dung này sẽ dùng ở trang Dịch vụ và modal gallery demo.
            </p>

            {/* 3 field cơ bản: CHỈ XEM, KHÔNG SỬA */}
            <div className="form-group">
              <label>Tiêu đề</label>
              <div className="admin-readonly-field">{selected.title}</div>
            </div>

            <div className="form-group">
              <label>Subtitle</label>
              <div className="admin-readonly-field">
                {selected.subtitle}
              </div>
            </div>

            <div className="form-group">
              <label>Mô tả</label>
              <div className="admin-readonly-field admin-readonly-multiline">
                {selected.description}
              </div>
            </div>

            <hr />

            {/* PHẦN ĐƯỢC SỬA: DEMO (text) */}
            <div className="form-group">
              <label>Tiêu đề demo</label>
              <input
                value={selected.demoTitle || ""}
                onChange={(e) => updateService("demoTitle", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Mô tả demo</label>
              <textarea
                rows={3}
                value={selected.demoDescription || ""}
                onChange={(e) =>
                  updateService("demoDescription", e.target.value)
                }
              />
            </div>

            <hr />

            <div className="form-group">
              <label>Thêm demo (ảnh / gif / video)</label>
              <input
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  for (const file of files) {
                    try {
                      await addMedia(file);
                    } catch (err) {
                      console.error(err);
                      alert("Upload thất bại cho " + file.name);
                    }
                  }
                  e.target.value = "";
                }}
              />
              <p className="admin-panel-desc" style={{ marginTop: 4 }}>
                Hệ thống sẽ tự tách ảnh tĩnh và video/GIF dựa vào loại file.
              </p>
            </div>

            <div style={{ marginTop: 10, textAlign: "right" }}>
              <button className="btn-primary" type="button" onClick={saveAll}>
                Lưu thay đổi
              </button>
            </div>
          </div>

          {/* === 2. DANH SÁCH DỊCH VỤ Ở GIỮA === */}
          <div className="admin-panel admin-service-list-panel">
            <h3 className="admin-panel-title">Danh sách dịch vụ</h3>
            <p className="admin-panel-desc">
              Click nút <b>Chọn</b> để chỉnh sửa demo cho dịch vụ tương ứng.
            </p>

            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên dịch vụ</th>
                    <th>Ảnh</th>
                    <th>Video / GIF</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td>{s.title}</td>
                      <td>{s.demoImages?.length || 0}</td>
                      <td>{s.demoVideos?.length || 0}</td>
                      <td className="admin-actions-cell">
                        <button
                          type="button"
                          className="admin-btn-small"
                          onClick={() =>
                            setSelected({
                              ...s,
                              demoImages: s.demoImages || [],
                              demoVideos: s.demoVideos || [],
                            })
                          }
                        >
                          Chọn
                        </button>
                      </td>
                    </tr>
                  ))}
                  {services.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ textAlign: "center" }}>
                        Chưa có dịch vụ nào trong cấu hình.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* === 3. NỘI DUNG DEMO – BÊN PHẢI, RỘNG HƠN === */}
          <div className="admin-panel admin-preview-panel admin-preview-wide">
            <h3 className="admin-panel-title">
              Nội dung demo của: {selected?.title}
            </h3>
            <p className="admin-panel-desc">
              Đây là nơi xem nhanh & xoá ảnh / video đã upload cho dịch vụ này.
            </p>

            <div className="admin-preview-stats">
              <span>
                Ảnh:{" "}
                <strong>{selected.demoImages?.length || 0}</strong>
              </span>
              <span>
                Video / GIF:{" "}
                <strong>{selected.demoVideos?.length || 0}</strong>
              </span>
            </div>

            <div className="admin-preview-scroll">
              {/* PREVIEW ẢNH */}
              <div className="form-group">
                <label>Ảnh demo</label>
                <div className="demo-images-preview preview-grid">
                  {(selected.demoImages || []).map((img) => (
                    <div key={img} className="preview-item">
                      <img src={img} alt="" />
                      <button
                        type="button"
                        className="admin-btn-small admin-btn-danger"
                        onClick={() => removeImage(img)}
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                  {(selected.demoImages || []).length === 0 && (
                    <p className="admin-panel-desc">
                      Chưa có ảnh demo cho dịch vụ này.
                    </p>
                  )}
                </div>
              </div>

              {/* PREVIEW VIDEO / GIF */}
              <div className="form-group">
                <label>Video / GIF demo</label>
                <div className="demo-videos-preview preview-grid">
                  {(selected.demoVideos || []).map((v) => (
                    <div key={v} className="preview-item">
                      <video src={v} controls />
                      <button
                        type="button"
                        className="admin-btn-small admin-btn-danger"
                        onClick={() => removeVideo(v)}
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                  {(selected.demoVideos || []).length === 0 && (
                    <p className="admin-panel-desc">
                      Chưa có video hoặc GIF demo cho dịch vụ này.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
