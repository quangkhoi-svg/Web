// backend/src/auth.js
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
// token đơn giản cho demo
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "gta5vn-gallery-token";

export function loginHandler(req, res) {
  const { username, password } = req.body || {};
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.json({ token: ADMIN_TOKEN });
  }
  return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
}

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");
  if (token === ADMIN_TOKEN) {
    return next();
  }
  return res.status(401).json({ message: "Không có quyền truy cập" });
}
