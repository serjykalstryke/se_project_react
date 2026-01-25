import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddGarmentModal.css";

function AddGarmentModal({ isOpen, handleClose }) {
	return (
		<ModalWithForm
			name="add-garment"
			buttonText="Add Garment"
			title="New Garment"
			isOpen={isOpen}
			handleClose={handleClose}
		>
			<label htmlFor="name" className="add-garment-modal__label">
				Name{" "}
				<input
					type="text"
					className="add-garment-modal__input"
					id="name"
					placeholder="Name"
				/>
			</label>

			<label htmlFor="imageUrl" className="add-garment-modal__label">
				Image{" "}
				<input
					type="url"
					className="add-garment-modal__input"
					id="imageUrl"
					placeholder="Image URL"
				/>
			</label>

			<fieldset className="add-garment-modal__radio-buttons">
				<legend className="add-garment-modal__legend">Select the weather type</legend>

				<label htmlFor="hot" className="add-garment-modal__label_type_radio">
					<input
						id="hot"
						name="weather"
						type="radio"
						className="add-garment-modal__radio-input"
						value="hot"
					/>
					<span className="add-garment-modal__radio-text">Hot</span>
				</label>

				<label htmlFor="warm" className="add-garment-modal__label_type_radio">
					<input
						id="warm"
						name="weather"
						type="radio"
						className="add-garment-modal__radio-input"
						value="warm"
					/>
					<span className="add-garment-modal__radio-text">Warm</span>
				</label>

				<label htmlFor="cold" className="add-garment-modal__label_type_radio">
					<input
						id="cold"
						name="weather"
						type="radio"
						className="add-garment-modal__radio-input"
						value="cold"
					/>
					<span className="add-garment-modal__radio-text">Cold</span>
				</label>
			</fieldset>
		</ModalWithForm>
	);
}

export default AddGarmentModal;
