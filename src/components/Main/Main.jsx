import "./Main.css";

import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useCurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnit";

function Main({ weatherData, handleCardClick, clothingItems }) {
	const { currentTemperatureUnit } = useCurrentTemperatureUnit();

	const displayTemp = currentTemperatureUnit === 'C' 
		? Math.round((weatherData.temperature - 32) * 5/9) 
		: weatherData.temperature;

	return (
		<main>
			<WeatherCard weatherData={weatherData} />
			<section className="cards">
				<p className="cards__text">
					Today is {displayTemp ?? "--"}&deg; {currentTemperatureUnit} / You may want to
					wear:
				</p>

				<ul className="cards__list">
					{clothingItems
						.filter((item) => item.weather === weatherData.type)
						.map((item) => (
							<ItemCard
								key={item._id}
								item={item}
								onCardClick={handleCardClick}
							/>
						))}
				</ul>
			</section>
		</main>
	);
}

export default Main;
