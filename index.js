const express = require('express');
const fetch = require('node-fetch'); // si besoin
const app = express();

app.get('/followers/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const apiUrl = `https://users.roblox.com/v1/users/${encodeURIComponent(id)}/followers/count`;
    const r = await fetch(apiUrl);
    if (!r.ok) return res.status(502).json({ error: 'upstream', status: r.status });
    const json = await r.json();
    res.set('Access-Control-Allow-Origin','*');
    res.json(json);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('listening', port));
