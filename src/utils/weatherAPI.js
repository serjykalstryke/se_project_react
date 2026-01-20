import { weatherApiKey, latitude, longitude } from "./constants";

function getWeatherCondition(temperature) {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
}

function requestWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Weather API error: ${res.status}`);
    }
    return res.json();
  });
}

function parseWeatherData(data) {
  return {
    temperature: Math.round(data.main.temp),
    city: data.name,
  };
}

export { getWeatherCondition, requestWeather, parseWeatherData };
