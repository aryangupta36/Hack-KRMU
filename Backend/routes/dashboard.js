const router = require('express').Router();
const runML = require(`../services/mlService`);
const { getAdvice } = require('../services/adviceService');
const fs = require('fs');

// Dashboard route
router.get("/", async (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (fs.existsSync("data/history.json")) {
  const history = JSON.parse(fs.readFileSync("data/history.json"));
  }
  const last = history.reverse().find(
    h => h.userId === userId
  );

  const weather = await axios.get("https://api.openweathermap.org/...");

  res.json({
    lastDiagnosis: last,
    weather: weather.data.main.temp,
    alerts: ["Check soil moisture"]
  });
});


// wheater api integration
const { getWeather } = require("../services/weatherService");

router.post("/weather", async (req, res) => {
  try {
    const { lat, lng } = req.body;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude and longitude required" });
    }

    const weather = await getWeather(lat, lng);

    res.json(weather);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
});


module.exports = router;
