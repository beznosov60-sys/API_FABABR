import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const KAD_URL = "https://kad.arbitr.ru/kadapi/v1.0";
const API_KEY = "61ae42aaf113c0c31fb4e3a5da572173";

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
    res.status(500).json({ error: "KAD card request failed" });
  }
});

app.listen(3001, () => {
  console.log("Backend proxy running on http://localhost:3001");
});
