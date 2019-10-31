const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());

app.get('/forecast/:city/:forecast', async (req, res) => {
  const city = req.params.city || 'bilund';
  const forecast = req.params.forecast || 'week';
  console.log(forecast);

  let coordinates = await getCoordinates(city);

  const long = coordinates[0];
  const lat = coordinates[1];
  console.log(lat + ', ' + long);

  let weather = await getWeather(lat, long, forecast);

  res.json(weather);
});

async function getCoordinates(city) {
  const apiurl =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/` +
    city +
    `.json?access_token=${process.env.MAPBOX_API_KEY}`;
  console.log(apiurl);

  const mapbox = await fetch(apiurl);
  const myJSON = await mapbox.json();
  console.log(myJSON.features[0].text);

  return myJSON.features[0].geometry.coordinates;
}

async function getWeather(long, lat, forecast) {
  console.log(forecast);

  if (forecast === 'week') {
    return await getWeek(long, lat);
  } else {
    return await getDay(long, lat, forecast);
  }
}

async function getWeek(long, lat) {
  const apiurl =
    `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/` +
    long +
    ',' +
    lat +
    '?lang=en&exclude=currently,minutly,hourly,alerts,flags&units=si';

  console.log(apiurl);

  const response = await fetch(apiurl);
  const weather = await response.json();

  return weather.daily.data;
}

async function getDay(long, lat, time) {
  console.log(time);

  const apiurl = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${long},${lat},${time}?lang=en&units=si`;
  //exclude=currently,minutly,hourly,alerts,flags&
  console.log(apiurl);

  const response = await fetch(apiurl);
  const weather = await response.json();

  return weather;
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
