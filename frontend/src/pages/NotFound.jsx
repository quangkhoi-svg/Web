import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h2>404 – Lạc đường rồi</h2>
      <p>Trang bạn tìm không tồn tại.</p>
      <Link to="/" className="btn-primary">
        Về trang chủ
      </Link>
    </section>
  );
}

export default NotFound;
