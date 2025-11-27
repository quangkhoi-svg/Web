// src/components/Navbar.jsx
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [isAdminLogged, setIsAdminLogged] = useState(
    !!localStorage.getItem("gta5vnAdminToken")
  );

  const location = useLocation();
  const navigate = useNavigate();

  // Cập nhật trạng thái đăng nhập mỗi khi route thay đổi
  useEffect(() => {
    setIsAdminLogged(!!localStorage.getItem("gta5vnAdminToken"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("gta5vnAdminToken");
    localStorage.removeItem("gta5vnAdminUser");
    setIsAdminLogged(false);
    navigate("/"); // quay về trang chủ
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          LT KING <span>Gallery</span>
        </Link>
      </div>

      <nav className="navbar-right">

        <NavLink to="/" end>
          Trang chủ
        </NavLink>

        <NavLink to="/collections">
          Bộ sưu tập
        </NavLink>

        <NavLink to="/services">
          Dịch vụ
        </NavLink>

        {/* ===================== ADMIN PART ===================== */}
        {!isAdminLogged && (
          <NavLink to="/login" style={{ marginLeft: "0.8rem" }}>
            Đăng nhập
          </NavLink>
        )}

        {isAdminLogged && (
          <>
            <NavLink
              to="/admin"
              className="btn-ghost"
              style={{ marginLeft: "1rem" }}
            >
              Admin Panel
            </NavLink>

            <button
              type="button"
              className="btn-primary"
              onClick={handleLogout}
              style={{ marginLeft: "0.8rem" }}
            >
              Đăng xuất
            </button>
          </>
        )}

      </nav>
    </header>
  );
}

export default Navbar;
