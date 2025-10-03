export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed. Use POST." });
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const { method: meth, url, headers: heads, sendBody } = req.body;

  console.log(typeof meth, typeof utl , typeof heads);

  if (!meth || !url || !heads) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  try {
    const options = {
      method: meth,
      headers: await JSON.parse(heads),
    };

    if (meth === "POST") {
      options.body = sendBody;
    }

    const r = await fetch(url, options);

    if (!r.ok) {
      return res.status(502).json({ error: "Erreur en amont", status: r.status });
    }

    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(505).json({ error: e.message });
  }
}
