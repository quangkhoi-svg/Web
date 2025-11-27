import SectionTitle from "../components/SectionTitle.jsx";
import "../styles/Home.css";

function Home() {
  return (
    <section className="home-wrap">
      <div className="home-hero">

        {/* TEXT BLOCK */}
        <div className="home-hero-left">
          <h1>LT KING Gallery</h1>
          <p>
            Bộ sưu tập tài khoản – <strong>chỉ trưng bày</strong>, không mua bán, 
            không môi giới. Xem acc đẹp, xe xịn, nhà sang từ 2 server Los Santos 
            &amp; Blaine County.
          </p>

          <p className="home-disclaimer">
            Disclaimer: Website phi thương mại, không chịu trách nhiệm cho mọi giao dịch tài khoản bên ngoài.
          </p>
        </div>

        {/* 3D CARD */}
        <div className="home-hero-right">
          <div className="home-hero-card">
            <span className="home-hero-badge">LT KING</span>
            <h3>Los Santos &amp; Blaine County</h3>
            <p>
              Hai thế giới, hai phong cách roleplay – cùng chung một gallery tài khoản.
            </p>

            <div className="home-mini-cards">
              <div className="home-mini-card">
                <span className="home-mini-title">Los Santos</span>
                <span className="home-mini-sub">Xe xịn · Nhà phố · Giàu có</span>
              </div>

              <div className="home-mini-card">
                <span className="home-mini-title">Blaine County</span>
                <span className="home-mini-sub">Vintage · Bụi bặm · Oldschool</span>
              </div>
            </div>
          </div>

          {/* 3 vòng sáng */}
          <div className="home-orbit home-o1" />
          <div className="home-orbit home-o2" />
          <div className="home-orbit home-o3" />
        </div>
      </div>

      {/* FEATURED */}
      <div className="featured-wrap">
        <SectionTitle
          title="Bộ sưu tập nổi bật"
          subtitle="Một vài acc đẹp từ 2 server."
        />
        <p className="featured-note">
          Hãy vào mục <strong>Bộ sưu tập</strong> trên thanh menu để xem danh sách acc.
        </p>
      </div>
    </section>
  );
}

export default Home;
