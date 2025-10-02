import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing userId in query ?id=" });
  }

  try {
    // Endpoint Roblox
    const apiUrl = `https://users.roblox.com/v1/users/${encodeURIComponent(id)}/followers/count`;
    const r = await fetch(apiUrl);

    if (!r.ok) {
      return res.status(502).json({ error: "Upstream error", status: r.status });
    }

    const data = await r.json();

    // Réponse avec CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
