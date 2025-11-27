import { useEffect, useState } from "react";
import { fetchServers } from "../services/serverApi.js";
import SectionTitle from "../components/SectionTitle.jsx";
import ServerCard from "../components/ServerCard.jsx";

function Servers() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServers()
      .then(setServers)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Đang tải danh sách máy chủ...</p>;

  return (
    <section>
      <SectionTitle
        title="Danh sách máy chủ"
        subtitle="Chọn server GTA5VN bạn đang chơi."
      />
      <div className="servers-row">
        {servers.map((s) => (
          <ServerCard key={s.id} server={s} />
        ))}
      </div>
    </section>
  );
}

export default Servers;
