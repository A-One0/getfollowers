import fetch from "node-fetch";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Missing userId in query ?id=" });
  }

  try {
   
    const apiUrl = `https://friends.roblox.com/v1/users/${encodeURIComponent(id)}/followers/count`;
    const r = await fetch(apiUrl);

    if (!r.ok) {
      return res.status(502).json({ error: "Upstream error 2", status: r.status });
    }

    const data = await r.json();

    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
