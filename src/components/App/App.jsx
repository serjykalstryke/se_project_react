import React, { useEffect, useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import { weatherApiKey, latitude, longitude } from "../../utils/constants";

import { defaultClothingItems } from "../../utils/constants";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddGarmentModal from "../AddGarmentModal/AddGarmentModal";
import ItemModal from "../ItemModal/ItemModal";

import {
	getWeatherCondition,
	requestWeather,
	parseWeatherData,
} from "../../utils/weatherAPI";

import { useCurrentTemperatureUnit } from "../../contexts/CurrentTemperatureUnitContext";
import { useForm } from "../../hooks/useForm";

function App() {
	const { currentTemperatureUnit, setCurrentTemperatureUnit } =
		useCurrentTemperatureUnit();

	const {
		values,
		handleChange: originalHandleChange,
		resetForm,
	} = useForm({
		name: "",
		link: "",
		weather: "",
	});

	const [formError, setFormError] = React.useState("");

	const handleChange = (event) => {
		originalHandleChange(event);
		if (formError) setFormError("");
	};

	const resetFormWithError = () => {
		resetForm();
		setFormError("");
	};

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
		resetFormWithError();
	};

	const handleAddGarment = (newGarment) => {
		const garmentWithId = {
			_id: Date.now(),
			name: newGarment.name,
			weather: newGarment.weather,
			link: newGarment.link,
		};
		setClothingItems([...clothingItems, garmentWithId]);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const missing = [];
		if (!values.name) missing.push("Name");
		if (!values.link) missing.push("Image URL");
		if (!values.weather) missing.push("Weather Type");
		if (missing.length > 0) {
			let errorMessage;
			if (missing.length === 1) {
				errorMessage = `${missing[0]} is required!`;
			} else if (missing.length === 2) {
				errorMessage = `${missing[0]} and ${missing[1]} are required!`;
			} else {
				const last = missing.pop();
				errorMessage = `${missing.join(", ")}, and ${last} are required!`;
			}
			setFormError(errorMessage);
		} else {
			handleAddGarment(values);
			resetFormWithError();
			handleClose();
		}
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
				<Routes>
					<Route path="/" element={<Navigate to="/dashboard" replace />} />
					<Route
						path="/dashboard"
						element={
							<Main
								weatherData={weatherData}
								handleCardClick={handleCardClick}
								clothingItems={clothingItems}
							/>
						}
					/>
					<Route
						path="/profile"
						element={
							<Profile
								clothingItems={clothingItems}
								handleCardClick={handleCardClick}
							/>
						}
					/>
					<Route path="*" element={<Navigate to="/dashboard" replace />} />
				</Routes>

				<Footer />
			</div>
			<AddGarmentModal
				isOpen={activeModal === "garment"}
				handleClose={handleClose}
				values={values}
				handleChange={handleChange}
				resetForm={resetFormWithError}
				onSubmit={handleSubmit}
				formError={formError}
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
