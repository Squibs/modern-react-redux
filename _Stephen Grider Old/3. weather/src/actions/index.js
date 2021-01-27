import axios from 'axios'; // use axios to make ajax request

const API_KEY = process.env.OPENWEATHERMAPS_API;
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_WEATHER = 'FETCH_WEATHER';

// uses middleware (redux-promise) to handle promises/callbacks; setup in src/index.js
export function fetchWeather(city) {
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request,
  };
}
