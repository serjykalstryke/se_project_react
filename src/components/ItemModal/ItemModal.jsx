import "./ItemModal.css";
import xButton from "../../assets/xButton.svg";

function ItemModal({ isOpen, card, handleClose }) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={handleClose}>
          <img src={xButton} alt="Close button" />
        </button>

        {card && (
          <>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
