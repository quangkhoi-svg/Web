// src/pages/Services.jsx
import { useState, useEffect } from "react";
import {
  DEFAULT_SERVICES,
  SERVICES_STORAGE_KEY,
} from "../data/servicesConfig";

/**
 * BUNDLE BOT DISCORD – chỉ dùng để hiển thị trong modal "Bot Discord"
 */
const DISCORD_BOTS = [
  {
    id: "bot-moderation",
    title: "Moderation AI Bot",
    subtitle: "AI auto-moderation & server security",
    features: [
      "AI Toxicity Filter (lọc chửi, toxic, spam)",
      "Anti Spam / Anti Flood / Anti mass ping",
      "Chặn NSFW / scam link",
      "Auto Warn • Mute • Ban theo cấp độ",
      "Hệ thống Strike + Slowmode thông minh",
    ],
  },
  {
    id: "bot-verification",
    title: "Verification Security Bot",
    subtitle: "Captcha verification & auto role",
    features: [
      "Verify bằng Captcha / Button",
      "Auto role sau verify",
      "Chặn multi-account",
      "Khoá quyền xem kênh trước khi verify",
      "Log đầy đủ: verify thành công / thất bại",
    ],
  },
  {
    id: "bot-ticket",
    title: "Ticket Support Bot",
    subtitle: "Professional ticket management",
    features: [
      "Ticket theo category: Report, Donate, Support…",
      "Staff claim / assign / close",
      "Lưu transcript TXT/PDF",
      "Ticket log đầy đủ",
      "Auto close khi quá thời gian",
    ],
  },
  {
    id: "bot-welcome",
    title: "Welcome & Profile Bot",
    subtitle: "Welcome card + auto roles",
    features: [
      "Welcome card đẹp, hỗ trợ AI",
      "Auto role theo giới tính / nhóm",
      "Auto format nickname",
      "Profile command (xem hồ sơ / info)",
      "Join / Leave logs",
    ],
  },
  {
    id: "bot-music",
    title: "Music Premium Bot",
    subtitle: "High-quality music streaming",
    features: [
      "YouTube • Spotify • Soundcloud",
      "BassBoost • 3D • Nightcore",
      "24/7 voice channel mode",
      "Playlist system",
      "Lyrics command",
    ],
  },
  {
    id: "bot-level",
    title: "Level & Rank Bot",
    subtitle: "XP & ranking system",
    features: [
      "Anti-farm XP",
      "Level / Rank roles",
      "Level card đẹp",
      "Leaderboard",
      "Daily / weekly rewards",
    ],
  },
  {
    id: "bot-logging",
    title: "Logging Bot",
    subtitle: "Full system logs",
    features: [
      "Log tin nhắn xoá / sửa",
      "Log join / leave",
      "Log đổi avatar / tên",
      "Log role add / remove",
      "Log tạo / xoá channel",
    ],
  },
  {
    id: "bot-utility",
    title: "Utility Tools Bot",
    subtitle: "Tools & server support",
    features: [
      "Ping host / server",
      "Weather / Time",
      "QR generator",
      "Random picker",
      "Suggestion system + embed builder",
    ],
  },
  {
    id: "bot-event",
    title: "Event & Quest Bot",
    subtitle: "Daily missions & events",
    features: [
      "Daily / weekly mission",
      "Gacha system",
      "Random drops",
      "Event XP & điểm tích luỹ",
      "Mini game tuỳ chỉnh",
    ],
  },
  {
    id: "bot-economy",
    title: "Economy Bot",
    subtitle: "Currency + shop system",
    features: [
      "Custom currency (tiền riêng của server)",
      "Shop item / role",
      "Bank system",
      "Inventory",
      "Trade & chuyển tiền giữa member",
    ],
  },
];

export default function Services() {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [view, setView] = useState(null); // dịch vụ đang mở gallery
  const [zoomItem, setZoomItem] = useState(null); // media đang phóng to

  // Khóa scroll khi modal mở
  useEffect(() => {
    const original = document.body.style.overflow;
    if (view || zoomItem) document.body.style.overflow = "hidden";
    else document.body.style.overflow = original || "auto";

    return () => {
      document.body.style.overflow = original || "auto";
    };
  }, [view, zoomItem]);

  // Load từ localStorage (Admin đã chỉnh sửa)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SERVICES_STORAGE_KEY);
      if (raw) setServices(JSON.parse(raw));
    } catch {}
  }, []);

  const openGallery = (service) => setView(service);
  const closeGallery = () => setView(null);

  const slideshow = view
    ? [...(view.demoImages || []), ...(view.demoVideos || [])]
    : [];

  // Render media (ảnh, video, youtube)
  const renderMedia = (src, extraProps = {}) => {
    const isYoutube = src.includes("youtube") || src.includes("youtu.be");
    const isVideo = src.endsWith(".mp4") || src.endsWith(".webm");

    if (isYoutube) {
      return (
        <iframe
          src={src.replace("watch?v=", "embed/")}
          allowFullScreen
          {...extraProps}
        />
      );
    }

    if (isVideo) {
      return <video src={src} controls {...extraProps} />;
    }

    return <img src={src} alt="" {...extraProps} />;
  };

  // ✅ Xác định service "Bot Discord"
  const isDiscordBotService = (svc) => {
    if (!svc) return false;
    const id = (svc.id || "").toLowerCase();
    const title = (svc.title || "").toLowerCase();
    return (
      id.includes("discord-bot") ||
      id.includes("bot-discord") ||
      title.includes("bot discord")
    );
  };

  return (
    <div className="page-container services-page">
      {/* ======================= HERO ======================= */}
      <section className="services-hero">
        <div className="services-hero-text">
          <p className="services-kicker">GTA5VN Gallery • Premium Services</p>

          <h1 className="services-title">
            Dịch vụ thiết kế • Setup Discord • Bot AI chuẩn quốc tế
          </h1>

          <p className="services-subtitle">
            Logo • Banner • Trailer • Discord Setup • Bot AI đa chức năng
          </p>

          <div className="services-hero-actions">
            <a href="#services-form" className="btn-primary">
              Đặt dịch vụ
            </a>

            <button
              type="button"
              className="btn-ghost-alt"
              onClick={() => window.open("https://discord.com", "_blank")}
            >
              Nhắn nhanh qua Discord
            </button>
          </div>

          <div className="services-hero-metrics">
            <div>
              <span className="metric-label">Phù hợp cho</span>
              <span className="metric-value">
                FiveM • GTA5 • Gaming Community
              </span>
            </div>

            <div>
              <span className="metric-label">Dịch vụ</span>
              <span className="metric-value">
                Logo • Banner • Video • Bot • Discord Setup
              </span>
            </div>
          </div>
        </div>

        <div className="services-hero-panel">
          <p className="hero-panel-title">Nhóm dịch vụ nổi bật</p>

          <div className="hero-panel-grid">
            {services.slice(0, 4).map((s) => (
              <div key={s.id} className="hero-mini-card">
                <h3>{s.title}</h3>
                <p>{s.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= SERVICE GRID ======================= */}
      <section className="services-section">
        <div className="services-section-header">
          <h2>Gói dịch vụ chi tiết</h2>
          <p>Xem mô tả, chức năng và gallery demo thiết kế.</p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <article
              key={s.id}
              className="service-card"
              onClick={() => openGallery(s)}
            >
              <div className="service-card-header">
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-subtitle">{s.subtitle}</p>
              </div>

              <p className="service-card-desc">{s.description}</p>

              {/* ⭐ LIST CHỨC NĂNG BOT (nếu có trong config) ⭐ */}
              {s.features && s.features.length > 0 && (
                <ul className="service-feature-preview">
                  {s.features.slice(0, 5).map((ft, idx) => (
                    <li key={idx}>✔ {ft}</li>
                  ))}
                  {s.features.length > 5 && (
                    <li className="more-features">
                      + {s.features.length - 5} chức năng khác…
                    </li>
                  )}
                </ul>
              )}

              <div className="service-card-footer">
                <span className="service-tag">Click để xem demo</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ======================= MODAL GALLERY ======================= */}
      {view && (
        <div className="gallery-modal">
          <div className="gallery-backdrop" onClick={closeGallery} />
          <div className="gallery-content-grid">
            <button className="gallery-close" onClick={closeGallery}>
              ✕
            </button>

            <h2 className="gallery-title">{view.demoTitle}</h2>
            <p className="gallery-desc">{view.demoDescription}</p>

            {/* 🔥 RIÊNG CHO DỊCH VỤ BOT DISCORD: HIỆN BẢNG BOT */}
            {isDiscordBotService(view) && (
              <section className="bot-discord-section">
                <p className="bot-discord-intro">
                  Gói <strong>Bot Discord</strong> gồm nhiều bot chuyên từng
                  mảng: moderation, bảo mật, ticket, music, economy… Bạn có thể
                  chọn full pack hoặc từng bot riêng tùy nhu cầu server.
                </p>

                <div className="bot-discord-grid">
                  {DISCORD_BOTS.map((bot) => (
                    <div key={bot.id} className="bot-discord-card">
                      <h3 className="bot-discord-title">{bot.title}</h3>
                      <p className="bot-discord-sub">{bot.subtitle}</p>
                    <ul className="bot-discord-list">
  {bot.features.map((f) => (
    <li key={f}>{f}</li>
  ))}
</ul>

                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* PHẦN GALLERY ẢNH / VIDEO (nếu có) */}
            <div className="gallery-grid" style={{ marginTop: 16 }}>
              {slideshow.length === 0 && !isDiscordBotService(view) && (
                <p className="service-modal-empty">
                  Chưa có demo cho dịch vụ này.
                </p>
              )}

              {slideshow.map((item, i) => (
                <div
                  key={i}
                  className="gallery-grid-item"
                  onClick={() => setZoomItem(item)}
                >
                  {renderMedia(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================= MODAL ZOOM MEDIA ======================= */}
      {zoomItem && (
        <div
          className="image-viewer-overlay"
          onClick={() => setZoomItem(null)}
        >
          <div
            className="image-viewer-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="image-viewer-frame">
              {renderMedia(zoomItem, { className: "image-viewer-media" })}
            </div>

            <button
              className="image-viewer-close"
              onClick={() => setZoomItem(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* ======================= FORM ======================= */}
      <section id="services-form" className="services-contact">
        <div className="services-contact-left">
          <h2>Đặt dịch vụ</h2>
          <p>Mô tả nhu cầu của bạn — tụi mình lo phần còn lại.</p>

          <ul className="services-highlight-list">
            <li>✔ Thiết kế chuẩn file bàn giao</li>
            <li>✔ Style theo vibe server</li>
            <li>✔ Chỉnh sửa đến khi hài lòng</li>
          </ul>

          <div className="services-pill-row">
            <span className="pill">Logo</span>
            <span className="pill">Banner</span>
            <span className="pill">Video</span>
            <span className="pill">Setup Discord</span>
            <span className="pill">Bot Discord</span>
          </div>
        </div>

        <div className="services-contact-right">
          <form
            className="services-form-modern"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form demo — bạn tự nối backend nhé!");
            }}
          >
            <div className="form-row">
              <div className="form-field">
                <label>Tên / nickname</label>
                <input required />
              </div>
              <div className="form-field">
                <label>Discord liên hệ</label>
                <input required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Dịch vụ</label>
                <select required>
                  <option value="">Chọn dịch vụ</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Ngân sách</label>
                <input placeholder="Không bắt buộc" />
              </div>
            </div>

            <div className="form-field">
              <label>Mô tả</label>
              <textarea required />
            </div>

            <div className="services-form-actions">
              <button type="submit" className="btn-primary">
                Gửi yêu cầu
              </button>
              <button
                type="button"
                className="btn-ghost-alt"
                onClick={() => window.open("https://discord.com", "_blank")}
              >
                Nhắn Discord
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
