// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Servers from "./pages/Servers.jsx";
import Collections from "./pages/Collections.jsx";
import Gallery from "./pages/Gallery.jsx";
import AccountDetail from "./pages/AccountDetail.jsx";

import Services from "./pages/Services.jsx";

import Admin from "./pages/Admin.jsx";
import AdminGate from "./pages/AdminGate.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminServices from "./pages/AdminServices.jsx";

import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="container">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/servers" element={<Servers />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/accounts/:id" element={<AccountDetail />} />
          <Route path="/services" element={<Services />} />

          {/* Admin login riêng */}
          <Route path="/login" element={<AdminLogin />} />

          {/* Admin – bộ sưu tập */}
          <Route
            path="/admin"
            element={
              <AdminGate>
                <Admin />
              </AdminGate>
            }
          />

          {/* Admin – dịch vụ */}
          <Route
            path="/admin/services"
            element={
              <AdminGate>
                <AdminServices />
              </AdminGate>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
