function ServerCard({ server, showOnline = true }) {
  return (
    <div className="server-card">
      <div className="server-card-image-wrapper">
        <img src={server.image} alt={server.name} className="server-card-image" />
        {showOnline && (
          <div className="server-card-online">• Online: {server.online}</div>
        )}
        <div className="server-card-footer">
          <div className="server-card-footer-main">{server.name}</div>
          <div className="server-card-footer-sub">
            {server.subtitle || "Roleplay City"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerCard;
