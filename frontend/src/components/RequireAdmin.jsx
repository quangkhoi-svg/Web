// src/components/RequireAdmin.jsx
import { Navigate } from "react-router-dom";

export default function RequireAdmin({ children }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Nếu chưa login admin -> quay về trang login
  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
