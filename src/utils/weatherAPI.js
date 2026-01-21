function getWeatherCondition(temperature) {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
}

function getConditionBucket(conditionId) {
  if (!conditionId) return "clear";

  if (conditionId >= 200 && conditionId < 300) return "thunderstorm";
  if (conditionId >= 300 && conditionId < 400) return "drizzle";
  if (conditionId >= 500 && conditionId < 600) return "rain";
  if (conditionId >= 600 && conditionId < 700) return "snow";
  if (conditionId >= 700 && conditionId < 800) return "fog";     
  if (conditionId === 800) return "clear";
  if (conditionId > 800 && conditionId < 900) return "clouds";

  return "clear";
}


function requestWeather(weatherApiKey, latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherApiKey}`;

  return fetch(url).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Weather API error: ${res.status}`);
    }
    return res.json();
  });
}

function parseWeatherData(data) {
  const conditionId = data.weather?.[0]?.id;
  const icon = data.weather?.[0]?.icon;
  const isDay = icon ? icon.endsWith("d") : true;

  return {
    temperature: Math.round(data.main.temp),
    city: data.name,
    conditionId,
    isDay,
  };
}


export { getWeatherCondition, requestWeather, parseWeatherData, getConditionBucket };
