import { servers } from "../data/servers.js";

export const getServers = (req, res) => {
  res.json(servers);
};

export const getServerById = (req, res) => {
  const server = servers.find((s) => s.id === req.params.id);
  if (!server) return res.status(404).json({ message: "Server not found" });
  res.json(server);
};
