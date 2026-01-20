function ItemModal({ isOpen, card, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  if (!card) return null;

  return (
    <div
      className={`modal modal_type_preview ${isOpen ? "modal_is-opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        />
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__caption">
          <p className="modal__name">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
