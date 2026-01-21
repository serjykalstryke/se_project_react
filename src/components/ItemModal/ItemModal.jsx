import "./ItemModal.css";

import React from "react";
import xButton from "../../assets/xButton.svg";

function ItemModal({ isOpen, card, handleClose }) {
	const handleOverlayClick = (e) => {
		if (e.target === e.currentTarget) {
			handleClose();
		}
	};

	React.useEffect(() => {
		if (!isOpen) return;

		const handleEsc = (e) => {
			if (e.key === "Escape") handleClose();
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [isOpen, handleClose]);
	return (
		<div
			className={`modal ${isOpen ? "modal__opened" : ""}`}
			onMouseDown={handleOverlayClick}
		>
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
