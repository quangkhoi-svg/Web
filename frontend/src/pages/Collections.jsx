// src/pages/Collections.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../components/SectionTitle.jsx";

import lsBg from "../assets/los-santos.png";
import bcBg from "../assets/blaine-county.png";

const SERVER_LABELS = {
  "los-santos": "Los Santos",
  "blaine-county": "Blaine County",
};

function Collections() {
  const [selectedServer, setSelectedServer] = useState(null);

  // ---- MUSIC STATE ----
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio("/music/music.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    audio
      .play()
      .then(() => setIsMusicPlaying(true))
      .catch(() => setIsMusicPlaying(false));

    const handleKeyDown = () => {
      if (!audioRef.current) return;

      if (audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsMusicPlaying(true))
          .catch(() => {});
      } else {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const openSelectType = (server) => setSelectedServer(server);
  const closeSelectType = () => setSelectedServer(null);

  const goTo = (type) => {
    if (!selectedServer) return;
    navigate(`/gallery?server=${selectedServer}&type=${type}`);
    setSelectedServer(null);
  };

  return (
    <section>
      {/* Tiêu đề giữa trang */}
      <div className="collections-header">
        <SectionTitle
          title="Bộ sưu tập GTA5VN"
          subtitle="Chọn server để xem bộ sưu tập tài khoản tương ứng."
        />
      </div>

      {/* 2 khung chọn server */}
      <div className="collections-layout">
        {/* LOS SANTOS */}
        <div
          className="collection-card"
          onClick={() => openSelectType("los-santos")}
        >
          <div className="collection-img-wrapper">
            <img
              src={lsBg}
              className="collection-img"
              alt="Los Santos"
              loading="lazy"
              decoding="async"
            />
          </div>

          <button
            type="button"
            className="collection-cta"
            onClick={(e) => {
              e.stopPropagation();
              openSelectType("los-santos");
            }}
          >
            Truy cập
          </button>
        </div>

        {/* BLAINE COUNTY */}
        <div
          className="collection-card"
          onClick={() => openSelectType("blaine-county")}
        >
          <div className="collection-img-wrapper">
            <img
              src={bcBg}
              className="collection-img"
              alt="Blaine County"
              loading="lazy"
              decoding="async"
            />
          </div>

          <button
            type="button"
            className="collection-cta"
            onClick={(e) => {
              e.stopPropagation();
              openSelectType("blaine-county");
            }}
          >
            Truy cập
          </button>
        </div>
      </div>

      {/* POPUP chọn Nhân vật / Thời trang */}
      {selectedServer && (
        <div className="select-type-overlay" onClick={closeSelectType}>
          <div className="select-type-box" onClick={(e) => e.stopPropagation()}>
            <div className="select-type-chip">Bộ sưu tập</div>

            <h3 className="select-type-title">
              {SERVER_LABELS[selectedServer] || selectedServer}
            </h3>

            <p className="select-type-sub">
              Chọn khu vực bạn muốn xem trước trong bộ sưu tập này.
            </p>

            <div className="select-type-buttons">
              <button
                type="button"
                className="select-type-btn"
                onClick={() => goTo("nhan-vat")}
              >
                Nhân vật
              </button>

              <button
                type="button"
                className="select-type-btn"
                onClick={() => goTo("thoi-trang")}
              >
                Thời trang
              </button>
            </div>

            <button
              type="button"
              className="select-type-close-link"
              onClick={closeSelectType}
            >
              Hủy thao tác
            </button>
          </div>
        </div>
      )}

      {/* ==== BADGE TRẠNG THÁI NHẠC ==== */}
      <div className="music-indicator">
        <span
          className={`music-indicator-dot ${
            isMusicPlaying ? "music-indicator-dot--on" : ""
          }`}
        />
        <span className="music-indicator-text">
          {isMusicPlaying ? "Nhạc nền: Đang phát" : "Nhạc nền: Đã tắt"}
          <span className="music-indicator-hint">
            {" "}
            • Bấm phím bất kỳ để {isMusicPlaying ? "tắt" : "bật"}
          </span>
        </span>
      </div>
    </section>
  );
}

export default Collections;
