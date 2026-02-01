import "./ModalWithForm.css";

import xButtonGray from "../../assets/xButtonGray.svg";
import { useEscapeKey, createOverlayClickHandler } from "../../hooks/modalFunctions";

function ModalWithForm({
	name,
	children,
	buttonText,
	title,
	isOpen,
	handleClose,
	onSubmit,
}) {
	const handleOverlayClick = createOverlayClickHandler(handleClose);

	useEscapeKey(isOpen, handleClose);

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

				<form name={name} onSubmit={onSubmit} className="modal__form" noValidate>
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
