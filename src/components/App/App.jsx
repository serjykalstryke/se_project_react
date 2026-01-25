import React, { useEffect, useState } from "react";

import { weatherApiKey, latitude, longitude } from "../../utils/constants";

import { defaultClothingItems } from "../../utils/constants";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddGarmentModal from "../AddGarmentModal/AddGarmentModal";
import ItemModal from "../ItemModal/ItemModal";

import {
	getWeatherCondition,
	requestWeather,
	parseWeatherData,
} from "../../utils/weatherAPI";

import { useCurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnit";

function App() {
	const { currentTemperatureUnit, setCurrentTemperatureUnit } =
		useCurrentTemperatureUnit();

	const [weatherData, setWeatherData] = React.useState({
		type: "",
		temperature: null,
		city: "",
	});
	const [activeModal, setActiveModal] = React.useState("");
	const [selectedCard, setSelectedCard] = React.useState(null);

	const [clothingItems, setClothingItems] =
		React.useState(defaultClothingItems);

	const handleCardClick = (card) => {
		setSelectedCard(card);
		setActiveModal("preview");
	};

	const handleAddClick = () => {
		setActiveModal("garment");
	};

	const handleClose = () => {
		setActiveModal("");
		setTimeout(() => setSelectedCard(null), 500);
	};

	useEffect(() => {
		requestWeather(weatherApiKey, latitude, longitude)
			.then((data) => {
				const parsedData = parseWeatherData(data);
				const condition = getWeatherCondition(parsedData.temperature);
				setWeatherData({ ...parsedData, type: condition });
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleToggleSwitchChange = () => {
		setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
	};

	return (
		<div className="page">
			<div className="page__content">
				<Header
					handleAddClick={handleAddClick}
					weatherData={weatherData}
					handleToggleSwitchChange={handleToggleSwitchChange}
					currentTemperatureUnit={currentTemperatureUnit}
				/>
				<Main
					weatherData={weatherData}
					handleCardClick={handleCardClick}
					clothingItems={clothingItems}
				/>
				<Footer />
			</div>
			<AddGarmentModal
				isOpen={activeModal === "garment"}
				handleClose={handleClose}
			/>

			<ItemModal
				isOpen={activeModal === "preview"}
				handleClose={handleClose}
				card={selectedCard}
			/>
		</div>
	);
}

export default App;
