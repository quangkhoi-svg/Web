// src/services/api.js

// ==============================================
// API BASE URL
// ==============================================
// ƯU TIÊN lấy từ biến môi trường VITE_API_URL
// Nếu không có thì mặc định dùng backend LOCAL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000/api";

// Debug xem frontend đang gọi API nào (bạn có thể xoá sau)
console.log("👉 API BASE:", API_BASE_URL);

// ==============================================
// TOKEN ADMIN
// ==============================================
const getAuthHeaders = () => {
  const token = localStorage.getItem("gta5vnAdminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ==============================================
// ADMIN LOGIN
// ==============================================
export async function adminLogin(username, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng nhập thất bại");
  }

  return res.json();
}

// ==============================================
// PUBLIC API
// ==============================================
export async function fetchAccounts(query = "") {
  const res = await fetch(`${API_BASE_URL}/accounts${query}`);

  if (!res.ok) {
    const txt = await res.text();
    console.error("❌ fetchAccounts error:", txt);
    throw new Error("Failed to fetch accounts");
  }

  return res.json();
}

export async function fetchAccountById(id) {
  const res = await fetch(`${API_BASE_URL}/accounts/${id}`);

  if (!res.ok) {
    const txt = await res.text();
    console.error("❌ fetchAccountById error:", txt);
    throw new Error("Failed to fetch account");
  }

  return res.json();
}

// ==============================================
// ADMIN CRUD
// ==============================================
export async function createAccount(data) {
  const res = await fetch(`${API_BASE_URL}/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("❌ createAccount error:", txt);
    throw new Error("Failed to create account");
  }

  return res.json();
}

export async function updateAccount(id, data) {
  const res = await fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("❌ updateAccount error:", txt);
    throw new Error("Failed to update account");
  }

  return res.json();
}

export async function deleteAccount(id) {
  const res = await fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: "DELETE",
    headers: { ...getAuthHeaders() },
  });

  if (!res.ok) {
    const txt = await res.text();
    console.error("❌ deleteAccount error:", txt);
    throw new Error("Failed to delete account");
  }

  return res.json();
}

// ==============================================
// STATS
// ==============================================
export async function fetchStats() {
  const res = await fetch(`${API_BASE_URL}/stats`);

  if (!res.ok) {
    const txt = await res.text();
    console.error("❌ fetchStats error:", txt);
    throw new Error("Failed to fetch stats");
  }

  return res.json();
}
