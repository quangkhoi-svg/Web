const API_BASE_URL = "http://localhost:4000/api";

export async function fetchServers() {
  const res = await fetch(`${API_BASE_URL}/servers`);
  if (!res.ok) throw new Error("Failed to fetch servers");
  return res.json();
}
