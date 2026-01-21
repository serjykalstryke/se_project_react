import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddGarmentModal.css"; 

function AddGarmentModal({ isOpen, handleClose }) {
  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      isOpen={isOpen}
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
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>

        <label htmlFor="hot" className="modal__label_type_radio">
          <input id="hot" name="weather" type="radio" className="modal__radio-input" />
          <span className="modal__radio-text">Hot</span>
        </label>

        <label htmlFor="warm" className="modal__label_type_radio">
          <input id="warm" name="weather" type="radio" className="modal__radio-input" />
          <span className="modal__radio-text">Warm</span>
        </label>

        <label htmlFor="cold" className="modal__label_type_radio">
          <input id="cold" name="weather" type="radio" className="modal__radio-input" />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddGarmentModal;
