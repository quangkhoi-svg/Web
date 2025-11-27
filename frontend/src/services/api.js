// src/services/api.js
const API_BASE_URL = "http://localhost:4000/api";

// Lấy token admin từ localStorage để gửi lên backend
const getAuthHeaders = () => {
  const token = localStorage.getItem("gta5vnAdminToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ===== LOGIN ADMIN =====
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

  return res.json(); // ví dụ: { token: "gta5vn-gallery-token" }
}

// ===== PUBLIC GET =====
export async function fetchAccounts(query = "") {
  const res = await fetch(`${API_BASE_URL}/accounts${query}`);
  if (!res.ok) throw new Error("Failed to fetch accounts");
  return res.json();
}

export async function fetchAccountById(id) {
  const res = await fetch(`${API_BASE_URL}/accounts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch account");
  return res.json();
}

// ===== ADMIN ONLY – cần token =====
export async function createAccount(data) {
  const res = await fetch(`${API_BASE_URL}/accounts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create account");
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
  if (!res.ok) throw new Error("Failed to update account");
  return res.json();
}

export async function deleteAccount(id) {
  const res = await fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });
  if (!res.ok) throw new Error("Failed to delete account");
  return res.json();
}

// ===== STATS (lượt truy cập) =====
export async function fetchStats() {
  const res = await fetch(`${API_BASE_URL}/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json(); // ví dụ backend trả: { visits: 123 }
}
