import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const KAD_URL = "https://kad.arbitr.ru/kadapi/v1.0";
const API_KEY = process.env.KAD_API_KEY || "61ae42aaf113c0c31fb4e3a5da572173";

app.post("/api/search", async (req, res) => {
  try {
    const response = await axios.post(`${KAD_URL}/search`, req.body, {
      params: { key: API_KEY }
    });

    res.json(response.data);
  } catch (err) {
    console.error("Ошибка при поиске дела:", err.message);
    res.status(500).json({ error: "KAD request failed" });
  }
});

app.get("/api/card", async (req, res) => {
  try {
    const response = await axios.get(`${KAD_URL}/card`, {
      params: { ...req.query, key: API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Ошибка при запросе карточки дела:", err.message);
    res.status(500).json({ error: "KAD card request failed" });
  }
});

app.get("/api/card/events", async (req, res) => {
  try {
    const response = await axios.get(`${KAD_URL}/card/events`, {
      params: { ...req.query, key: API_KEY }
    });
    res.json(response.data);
  } catch (err) {
    console.error("Ошибка при запросе событий дела:", err.message);
    res.status(500).json({ error: "KAD events request failed" });
  }
});

app.get("/api/pdf", async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const contentType = response.headers["content-type"] || "application/pdf";
    res.setHeader("Content-Type", contentType);
    res.send(response.data);
  } catch (err) {
    console.error("Ошибка при загрузке PDF:", err.message);
    res.status(500).json({ error: "PDF download failed" });
  }
});

app.listen(3001, () => {
  console.log("Backend proxy running on http://localhost:3001");
});
