import React, { useEffect, useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddGarmentModal from "../AddGarmentModal/AddGarmentModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.jsx";

import { getItems, addItem, deleteItem } from "../../utils/api.js";

import {
	getWeatherCondition,
	requestWeather,
	parseWeatherData,
	weatherApiKey,
	latitude,
	longitude,
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
	const [cardToDelete, setCardToDelete] = useState(null);

	const [clothingItems, setClothingItems] = React.useState([]);

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
		addItem({
			name: newGarment.name,
			imageUrl: newGarment.link,
			weather: newGarment.weather,
		})
			.then((addedItem) => {
				setClothingItems([addedItem, ...clothingItems]);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleDeleteGarment = (itemId) => {
		deleteItem(itemId)
			.then(() => {
				setClothingItems(
					clothingItems.filter((item) => item._id !== itemId)
				);
			})
			.catch((err) => {
				console.error(err);
			});
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

	const handleOpenConfirmModal = (card) => {
		setCardToDelete(card);
		setActiveModal("confirmDelete");
	};

	const handleConfirmDelete = () => {
		if (cardToDelete) {
			handleDeleteGarment(cardToDelete._id);
			setCardToDelete(null);
		}
		handleClose();
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

		getItems()
			.then((items) => {
				setClothingItems(items.reverse());
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
								handleAddClick={handleAddClick}
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
				handleOpenConfirmModal={handleOpenConfirmModal}
			/>
			<ConfirmationModal
				isOpen={activeModal === "confirmDelete"}
				handleClose={handleClose}
				handleConfirmDelete={handleConfirmDelete}
				itemName={cardToDelete?.name}
			/>

		</div>
	);
}

export default App;
