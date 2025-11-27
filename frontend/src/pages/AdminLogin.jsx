// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../services/api.js";

function AdminLogin() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token } = await adminLogin(username, password);

      // LƯU ĐÚNG KEY ở localStorage
      localStorage.setItem("gta5vnAdminToken", token);
      localStorage.setItem("gta5vnAdminUser", username);

      // Chuyển sang trang admin
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h2 className="admin-login-title">Đăng nhập Admin</h2>
          <p className="admin-login-sub">
            Chỉ quản trị viên mới truy cập được trang này.
          </p>

          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label>Tài khoản</label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="admin-login-error">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AdminLogin;
