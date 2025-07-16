
require('dotenv').config(); // 👈 Load .env file
console.log("Loaded API Key:", process.env.WEATHER_API_KEY); // 👈 Debug log
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const API_KEY = process.env.WEATHER_API_KEY;
app.use((req, res, next) => {
  console.log("🔥 Request received:", req.method, req.url);
  next();
});
app.get('/', (req, res) => {
  res.send("Jai Shri Krishna! Server is alive 🌸");
});

app.get('/weather', async (req, res) => {
    const city = req.query.city;
	console.log("City requested:", city);
    if (!city) return res.send("Please provide a city name");

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const weather = {
            location: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description
        };

        res.json(weather);
    } catch (error) {
        res.status(500).send("City not found or error fetching weather");
    }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

