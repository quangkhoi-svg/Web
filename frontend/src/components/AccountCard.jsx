import { Link } from "react-router-dom";

// (tuỳ chọn) helper tối ưu Cloudinary, dùng sau
function optimizeImg(url) {
  if (!url || !url.includes("/upload/")) return url;
  // Resize + auto format, chất lượng tốt mà nhẹ
  return url.replace("/upload/", "/upload/w_900,q_auto,f_auto/");
}

function AccountCard({ account }) {
  // ⭐ Ưu tiên dùng ảnh chính
  const rawCover =
    account.mainImage ||
    (account.images && account.images[0]) ||
    "https://placehold.co/400x250?text=No+Image";

  const cover = optimizeImg(rawCover);

  const serverName =
    account.server === "los-santos" ? "Los Santos" : "Blaine County";

  return (
    <div className="card">
      <img
        src={cover}
        alt={account.title}
        className="card-image"
        loading="lazy"
        decoding="async"
      />

      <div className="card-body">
        <h3 className="card-title">{account.title}</h3>

        <p className="card-subtitle">
          Server: {serverName} • Rank: {account.rank}
        </p>

        <p className="card-text">{account.description}</p>

        <Link
          className="card-link"
          to={`/accounts/${account._id || account.id}`}
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default AccountCard;
