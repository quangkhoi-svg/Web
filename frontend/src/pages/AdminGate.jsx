// src/pages/AdminGate.jsx
import { Navigate, useLocation } from "react-router-dom";

export default function AdminGate({ children }) {
  const location = useLocation();

  // Kiểm tra token đúng theo AdminLogin đã lưu
  const token = localStorage.getItem("gta5vnAdminToken");

  // Nếu chưa đăng nhập → đá về /login
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }} // để login xong quay lại trang admin
      />
    );
  }

  // Nếu có token → cho truy cập vào admin
  return children;
}
