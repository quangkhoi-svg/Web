// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  fetchStats,
} from "../services/api.js";
import SectionTitle from "../components/SectionTitle.jsx";
import AdminAccountForm from "../components/AdminAccountForm.jsx";

function Admin() {
  const [accounts, setAccounts] = useState([]);
  const [filterServer, setFilterServer] = useState("all"); // ⭐ NEW: Lọc server
  const [editing, setEditing] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState(null);

  const navigate = useNavigate();

  const loadAccounts = () => {
    setRefreshing(true);
    fetchAccounts()
      .then(setAccounts)
      .catch((err) => console.error(err))
      .finally(() => setRefreshing(false));
  };

  const loadStats = () => {
    fetchStats()
      .then(setStats)
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadAccounts();
    loadStats();
  }, []);

  const handleCreate = async (data) => {
    try {
      await createAccount(data);
      setEditing(null);
      loadAccounts();
    } catch (err) {
      alert("Tạo acc thất bại");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await updateAccount(editing.id, data);
      setEditing(null);
      loadAccounts();
    } catch (err) {
      alert("Cập nhật acc thất bại");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Xoá acc này?")) return;
    try {
      await deleteAccount(id);
      loadAccounts();
    } catch (err) {
      alert("Xoá acc thất bại");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("gta5vnAdminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin");
  };

  // ⭐ Lọc danh sách theo server
  const filteredAccounts =
    filterServer === "all"
      ? accounts
      : accounts.filter((acc) => acc.server === filterServer);

  // ⭐ Thống kê cập nhật theo filter
  const totalImages = filteredAccounts.reduce(
    (sum, acc) => sum + (acc.images?.length || 0),
    0
  );

  const characterCount = filteredAccounts.filter(
    (a) => a.section === "character"
  ).length;

  const fashionCount = filteredAccounts.filter(
    (a) => a.section === "fashion"
  ).length;

  return (
    <section className="admin-page">
      {/* HEADER */}
      <header className="admin-header-row">
        <div className="admin-title-block">
          <SectionTitle
            title="Admin – Quản lý bộ sưu tập"
            subtitle="Thêm / sửa / xoá tài khoản trưng bày."
          />
        </div>

        <div className="admin-actions">
          <button
            type="button"
            className="btn-ghost admin-refresh-btn"
            onClick={() => {
              loadAccounts();
              loadStats();
            }}
            disabled={refreshing}
          >
            {refreshing ? "Đang tải..." : "Refresh"}
          </button>

          <button
            type="button"
            className="btn-ghost admin-refresh-btn"
            onClick={() => navigate("/admin/services")}
          >
            Quản lý dịch vụ
          </button>

          <button
            type="button"
            className="btn-primary admin-logout-btn"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* MỤC 1: TỔNG QUAN */}
      <section className="admin-section admin-section--overview">
        <h3 className="admin-section-title">Tổng quan hệ thống</h3>
        <p className="admin-section-sub">
          Số lượng tài khoản, ảnh showcase và lượt truy cập website.
        </p>

        {/* ⭐ BỘ LỌC SERVER */}
        <div className="admin-filter-row">
          <label style={{ marginRight: 10, opacity: 0.8 }}>Lọc theo server:</label>
          <select
            value={filterServer}
            onChange={(e) => setFilterServer(e.target.value)}
            className="admin-filter-select"
          >
            <option value="all">— Tất cả server —</option>
            <option value="los-santos">Los Santos</option>
            <option value="blaine-county">Blaine County</option>
          </select>
        </div>

        <div className="admin-stat-cards">
          <div className="admin-stat-card">
            <div className="admin-stat-label">Tổng tài khoản</div>
            <div className="admin-stat-value">{filteredAccounts.length}</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">Nhân vật</div>
            <div className="admin-stat-value">{characterCount}</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">Thời trang</div>
            <div className="admin-stat-value">{fashionCount}</div>
          </div>

          <div className="admin-stat-card">
            <div className="admin-stat-label">Tổng số ảnh</div>
            <div className="admin-stat-value">{totalImages}</div>
          </div>

          <div className="admin-stat-card admin-stat-card--accent">
            <div className="admin-stat-label">Lượt truy cập website</div>
            <div className="admin-stat-value">{stats?.visits ?? "--"}</div>
            <div className="admin-stat-foot">Đếm từ API /stats</div>
          </div>
        </div>
      </section>

      {/* MỤC 2: QUẢN LÝ TÀI KHOẢN */}
      <section className="admin-section admin-section--accounts">
        <h3 className="admin-section-title">Quản lý tài khoản trưng bày</h3>
        <p className="admin-section-sub">
          Tạo acc showcase mới hoặc chỉnh sửa / xoá những acc hiện có.
        </p>

        <div className="admin-layout">
          {/* FORM */}
          <div className="admin-left">
            <div className="admin-panel">
              <h4 className="admin-panel-title">
                {editing ? "Sửa tài khoản" : "Tạo tài khoản mới"}
              </h4>
              <p className="admin-panel-desc">
                Điền đầy đủ thông tin server, danh mục, rank, mô tả và ảnh.
              </p>

              <AdminAccountForm
                initialData={editing}
                onSubmit={editing ? handleUpdate : handleCreate}
                submitLabel={editing ? "Cập nhật" : "Tạo mới"}
              />
            </div>
          </div>

          {/* BẢNG DANH SÁCH */}
          <div className="admin-right">
            <div className="admin-panel">
              <div className="admin-list-header">
                <div>
                  <h4 className="admin-panel-title">
                    Danh sách tài khoản ({filteredAccounts.length})
                  </h4>
                </div>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tiêu đề</th>
                      <th>Server</th>
                      <th>Danh mục</th>
                      <th>Rank</th>
                      <th>Ảnh</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAccounts.map((acc) => (
                      <tr key={acc.id}>
                        <td>{acc.title}</td>
                        <td>
                          {acc.server === "los-santos"
                            ? "Los Santos"
                            : "Blaine County"}
                        </td>

                        <td>
                          {acc.section === "character"
                            ? "Nhân vật"
                            : "Thời trang"}
                        </td>

                        <td>{acc.rank}</td>
                        <td>{acc.images?.length || 0}</td>
                        <td className="admin-actions-cell">
                          <button
                            type="button"
                            className="admin-btn-small"
                            onClick={() => setEditing(acc)}
                          >
                            Sửa
                          </button>
                          <button
                            type="button"
                            className="admin-btn-small admin-btn-danger"
                            onClick={() => handleDelete(acc.id)}
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))}

                    {filteredAccounts.length === 0 && (
                      <tr>
                        <td colSpan={6}>Không có tài khoản nào.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Admin;
