import "./WeatherCard.css";

import clearDay from "../../assets/clearDay.svg";
import clearNight from "../../assets/clearNight.svg";
import cloudsDay from "../../assets/cloudyDay.svg";
import cloudsNight from "../../assets/cloudyNight.svg";
import rainDay from "../../assets/rainDay.svg";
import rainNight from "../../assets/rainNight.svg";
import snowDay from "../../assets/snowDay.svg";
import snowNight from "../../assets/snowNight.svg";
import fogDay from "../../assets/fogDay.svg";
import fogNight from "../../assets/fogNight.svg";

import { getConditionBucket } from "../../utils/weatherAPI";

const images = {
  clear:   { day: clearDay,   night: clearNight },
  clouds:  { day: cloudsDay,  night: cloudsNight },
  rain:    { day: rainDay,    night: rainNight },
  snow:    { day: snowDay,    night: snowNight },
  fog:     { day: fogDay,     night: fogNight },
  drizzle: { day: rainDay,    night: rainNight },      
  thunderstorm: { day: rainDay, night: rainNight },     
};

function WeatherCard({ weatherData }) {
  const bucket = getConditionBucket(weatherData.conditionId);
  const timeKey = weatherData.isDay ? "day" : "night";
  const imgSrc = images[bucket]?.[timeKey] ?? clearDay;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temperature ?? "--"}&deg; F
      </p>
      <img src={imgSrc} alt={`${bucket} ${timeKey}`} className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
