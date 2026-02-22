const axios = require("axios");

async function getWeather(lat, lon) {
  const apiKey = process.env.WEATHER_API_KEY || "demo";

  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        units: "metric",
        appid: apiKey,
      },
    },
  );

  const data = response.data;

  return {
    temperature: Math.round(data.main.temp),
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed),
    condition: data.weather[0].main,
    description: data.weather[0].description,
    rainPercent: data.clouds ? data.clouds.all : 0,
    location: data.name,
  };
}

module.exports = { getWeather };
