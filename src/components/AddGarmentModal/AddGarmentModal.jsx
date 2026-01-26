import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddGarmentModal.css";

function AddGarmentModal({ isOpen, handleClose, values, handleChange, resetForm, onSubmit, formError }) {

	return (
		<ModalWithForm
			name="add-garment"
			buttonText="Add Garment"
			title="New Garment"
			isOpen={isOpen}
			handleClose={handleClose}
			onSubmit={onSubmit}
		>
			<label htmlFor="name" className="add-garment-modal__label">
				Name{" "}
				<input
					type="text"
					className="add-garment-modal__input"
					id="name"
					placeholder="Name"
					name="name"
					value={values.name}
					onChange={handleChange}
				/>
			</label>

			<label htmlFor="link" className="add-garment-modal__label">
				Image{" "}
				<input
					type="url"
					className="add-garment-modal__input"
					id="link"
					placeholder="Image URL"
					name="link"
					value={values.link}
					onChange={handleChange}
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
						checked={values.weather === "hot"}
						onChange={handleChange}
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
						checked={values.weather === "warm"}
						onChange={handleChange}
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
						checked={values.weather === "cold"}
						onChange={handleChange}
					/>
					<span className="add-garment-modal__radio-text">Cold</span>
				</label>
			</fieldset>
			<p className={`add-garment-modal__error ${formError ? '' : 'add-garment-modal__error_hidden'}`}>{formError || 'Placeholder'}</p>
		</ModalWithForm>
	);
}

export default AddGarmentModal;
