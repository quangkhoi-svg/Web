import { useState, useEffect } from "react";
import "../styles/adminServices.css";

/* ============================
   API CALLS TO BACKEND
============================ */

// Load danh sách từ backend
async function fetchServicesFromServer() {
  const res = await fetch("https://api.nhayen.click/api/services");
  return res.json();
}

// Lưu 1 service lên backend
async function saveServiceToServer(id, update) {
  const res = await fetch(`https://api.nhayen.click/api/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  return res.json();
}

// Upload file lên VPS
async function uploadToServer(file) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("https://api.nhayen.click/api/upload", {
    method: "POST",
    body: fd,
  });

  const data = await res.json();

  if (!res.ok) {
    alert("Upload lỗi: " + file.name);
    throw new Error("Upload fail");
  }

  return data;
}

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);

  /* ============================
     LOAD SERVICES FROM BACKEND
  ============================ */
  useEffect(() => {
    async function load() {
      const list = await fetchServicesFromServer();
      setServices(list);
      if (list.length > 0) {
        setSelected({
          ...list[0],
          demoImages: list[0].demoImages || [],
          demoVideos: list[0].demoVideos || [],
        });
      }
    }
    load();
  }, []);

  /* ============================
     UPDATE LOCAL STATE
  ============================ */
  const updateLocal = (field, value) => {
    setServices((prev) =>
      prev.map((s) => (s.id === selected.id ? { ...s, [field]: value } : s))
    );
    setSelected((prev) => ({ ...prev, [field]: value }));
  };

  /* ============================
     UPLOAD MEDIA
  ============================ */
  const addMedia = async (file) => {
    const { url, mimetype } = await uploadToServer(file);

    if (mimetype.startsWith("video/") || mimetype === "image/gif") {
      updateLocal("demoVideos", [...selected.demoVideos, url]);
    } else {
      updateLocal("demoImages", [...selected.demoImages, url]);
    }
  };

  const removeImage = (url) => {
    updateLocal(
      "demoImages",
      selected.demoImages.filter((i) => i !== url)
    );
  };

  const removeVideo = (url) => {
    updateLocal(
      "demoVideos",
      selected.demoVideos.filter((v) => v !== url)
    );
  };

  /* ============================
     SAVE TO SERVER
  ============================ */
  const saveAll = async () => {
    await saveServiceToServer(selected.id, selected);
    alert("Đã lưu lên VPS!");
  };

  if (!selected) return <p>Đang tải dịch vụ...</p>;

  return (
    <section className="admin-page">
      {/* ===== HEADER ===== */}
      <div className="admin-header-row">
        <div>
          <h1 className="admin-section-title">Admin – Quản lý dịch vụ</h1>
          <p className="admin-section-sub">
            Upload demo & mô tả cho từng dịch vụ.
          </p>
        </div>

        <button className="btn-primary" onClick={saveAll}>
          Lưu tất cả lên VPS
        </button>
      </div>

      {/* ===== MAIN LAYOUT ===== */}
      <div className="admin-layout admin-layout--3cols">
        {/* ===== LEFT PANEL ===== */}
        <div className="admin-panel">
          <h3 className="admin-panel-title">Chỉnh sửa: {selected.title}</h3>

          <div className="form-group">
            <label>Tiêu đề demo</label>
            <input
              value={selected.demoTitle || ""}
              onChange={(e) => updateLocal("demoTitle", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mô tả demo</label>
            <textarea
              rows={3}
              value={selected.demoDescription || ""}
              onChange={(e) =>
                updateLocal("demoDescription", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Upload demo</label>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={async (e) => {
                const files = Array.from(e.target.files);
                for (const f of files) await addMedia(f);
                e.target.value = "";
              }}
            />
          </div>

          <button className="btn-primary" onClick={saveAll}>
            Lưu thay đổi
          </button>
        </div>

        {/* ===== SERVICE LIST ===== */}
        <div className="admin-panel admin-service-list-panel">
          <h3 className="admin-panel-title">Danh sách dịch vụ</h3>

          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Dịch vụ</th>
                <th>Ảnh</th>
                <th>Video</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {services.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.title}</td>
                  <td>{s.demoImages?.length || 0}</td>
                  <td>{s.demoVideos?.length || 0}</td>
                  <td>
                    <button
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
            </tbody>
          </table>
        </div>

        {/* ===== PREVIEW ===== */}
        <div className="admin-panel admin-preview-panel admin-preview-wide">
          <h3 className="admin-panel-title">
            Demo của: {selected.title}
          </h3>

          <h4>Ảnh</h4>
          <div className="preview-grid">
            {selected.demoImages.map((img) => (
              <div key={img} className="preview-item">
                <img src={img} />
                <button
                  className="admin-btn-small admin-btn-danger"
                  onClick={() => removeImage(img)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          <h4>Video / GIF</h4>
          <div className="preview-grid">
            {selected.demoVideos.map((v) => (
              <div key={v} className="preview-item">
                <video src={v} controls />
                <button
                  className="admin-btn-small admin-btn-danger"
                  onClick={() => removeVideo(v)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
