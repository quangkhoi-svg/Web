import { Link } from "react-router-dom";

function AccountCard({ account }) {
  // ⭐ Ưu tiên dùng ảnh chính
  const cover =
    account.mainImage ||
    (account.images && account.images[0]) ||
    "https://placehold.co/400x250?text=No+Image";

  const serverName =
    account.server === "los-santos" ? "Los Santos" : "Blaine County";

  return (
    <div className="card">
      <img src={cover} alt={account.title} className="card-image" />

      <div className="card-body">
        <h3 className="card-title">{account.title}</h3>

        <p className="card-subtitle">
          Server: {serverName} • Rank: {account.rank}
        </p>

        <p className="card-text">{account.description}</p>

        <Link className="card-link" to={`/accounts/${account.id}`}>
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}

export default AccountCard;
