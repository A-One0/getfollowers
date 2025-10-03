import fetch from "node-fetch";

export default async function handler(req, res) {
  // Autoriser uniquement les requêtes POST
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  // Gérer les entêtes CORS (optionnel mais utile pour éviter les erreurs de navigateur)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const body = JSON.parse(req.body);

  const meth = body.method
  const url = body.url
  const heads = body.headers
  if (meth == "POST"){
    const sendBody = body.sendBody
  }
  

  if (!id) {
    return res.status(400).json({ error: "Missing userId in request body" });
  }

  try {
    let r
    if (meth == "POST"){
        r = await fetch(url, {
            method: meth,
            headers: heads,
            body: sendBody
        });
    }else{
        r = await fetch(url, {
            method: meth,
            headers: heads
        });
    }

    

    if (!r.ok) {
      return res.status(502).json({ error: "Upstream error", status: r.status });
    }

    const data = await r.json();

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
