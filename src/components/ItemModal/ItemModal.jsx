import "./ItemModal.css";

import React from "react";
import xButton from "../../assets/xButton.svg";

function ItemModal({ isOpen, card, handleClose, handleOpenConfirmModal }) {
	const handleOverlayClick = (event) => {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	};

	const onGarmentDelete = () => {
		handleOpenConfirmModal(card);
	};

	React.useEffect(() => {
		if (!isOpen) return;

		const handleEsc = (event) => {
			if (event.key === "Escape") handleClose();
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
						<img src={card.imageUrl} alt={card.name} className="modal__image" />
						<div className="modal__footer">
							<div className="card__information">
								<h2 className="modal__caption">{card.name}</h2>
								<p className="modal__weather">Weather: {card.weather}</p>
							</div>
							<div className="card__delete-btn">
								<button
									type="button"
									className="modal__delete"
									onClick={onGarmentDelete}
								>
									Delete Garment
								</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default ItemModal;
