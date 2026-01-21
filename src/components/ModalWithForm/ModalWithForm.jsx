import "./ModalWithForm.css";

import React from "react";
import xButtonGray from "../../assets/xButtonGray.svg";

function ModalWithForm({
	name,
	children,
	buttonText,
	title,
	isOpen,
	handleClose,
}) {
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
			className={`modal modal_type_${name} ${isOpen ? "modal__opened" : ""}`}
			onMouseDown={handleOverlayClick}
		>
			<div className="modal__content">
				<h2 className="modal__title">{title}</h2>

				<button type="button" className="modal__close" onClick={handleClose}>
					<img src={xButtonGray} alt="Close button" />
				</button>

				<form name={name} className="modal__form" noValidate>
					{children}
					<button type="submit" className="modal__submit">
						{buttonText}
					</button>
				</form>
			</div>
		</div>
	);
}

export default ModalWithForm;
