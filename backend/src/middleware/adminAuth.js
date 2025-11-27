// 🔥 XÓA MẶC ĐỊNH HOÀN TOÀN
// Nếu ENV không có, dùng chính tài khoản bạn muốn
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "ltking225";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "22052005";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "gta5vn-gallery-token";

// ---- LOGIN ----
export function loginHandler(req, res) {
  const { username, password } = req.body || {};

  // So sánh user/pass
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN });
  }

  return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
}

// ---- PROTECT ROUTE ----
export function requireAdmin(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");

  if (token === ADMIN_TOKEN) return next();

  return res.status(401).json({ message: "Không có quyền truy cập" });
}
