import React from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
	const [weatherData, setWeatherData] = React.useState({ type: "hot" });
	const [activeModal, setActiveModal] = React.useState("");
	const [selectedCard, setSelectedCard] = React.useState(null);

	const handleCardClick = (card) => {
		setSelectedCard(card);
		setActiveModal("preview");
	};

	const handleAddClick = () => {
		setActiveModal("garment");
	};

	const handleClose = () => {
		setActiveModal("");
		setSelectedCard(null);
	};

	return (
		<div className="page">
			<div className="page__content">
				<Header handleAddClick={handleAddClick} />
				<Main weatherData={weatherData} />
				<Footer />
			</div>
			<ModalWithForm
				buttonText="Add Garment"
				title="New Garment"
				isOpen={activeModal === "garment"}
				handleClose={handleClose}
			>
				<label htmlFor="name" className="modal__label">
					Name{" "}
					<input
						type="text"
						className="modal__input"
						id="name"
						placeholder="Name"
					/>
				</label>
				<label htmlFor="imageUrl" className="modal__label">
					Image{" "}
					<input
						type="URL"
						className="modal__input"
						id="imageUrl"
						placeholder="Image URL"
					/>
				</label>
				<fieldset className="modal__radio-buttons">
					<legend className="modal__legend">Select the weather type</legend>
					<label htmlFor="hot" className="modal__label_type_radio">
						<input
							id="hot"
							name="weather"
							type="radio"
							className="modal__radio-input"
						/>{" "}
						<span className="modal__radio-text">Hot</span>
					</label>
					<label htmlFor="warm" className="modal__label_type_radio">
						<input
							id="warm"
							name="weather"
							type="radio"
							className="modal__radio-input"
						/>{" "}
						<span className="modal__radio-text">Warm</span>
					</label>
					<label htmlFor="cold" className="modal__label_type_radio">
						<input
							id="cold"
							name="weather"
							type="radio"
							className="modal__radio-input"
						/>{" "}
						<span className="modal__radio-text">Cold</span>
					</label>
				</fieldset>
			</ModalWithForm>
			<ItemModal isOpen={activeModal === "preview"} handleClose={handleClose} card={selectedCard} />
		</div>
	);
}

export default App;
