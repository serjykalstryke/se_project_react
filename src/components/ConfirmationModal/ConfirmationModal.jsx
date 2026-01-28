import "./ConfirmationModal.css";
import xButtonGray from "../../assets/xButtonGray.svg";

export default function ConfirmationModal({
	isOpen,
	handleClose,
	handleConfirmDelete,
	itemName,
}) {
	const handleOverlayClick = (event) => {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	};

	return (
		<div
			className={`modal ${isOpen ? "modal__opened" : ""}`}
			onMouseDown={handleOverlayClick}
		>
			<div className="modal__content confirmation-modal__content">
				<button
					type="button"
					className="confirmation-modal__close"
					onClick={handleClose}
				>
					<img src={xButtonGray} alt="Close button" />
				</button>
				<p className="confirmation-modal__message">
					Are you sure you want to delete this {itemName}?
					<br />
					This action is irreversible.
				</p>
				<div className="confirmation-modal__buttons">
					<button
						className="confirmation-modal__button confirmation-modal__button_delete"
						onClick={handleConfirmDelete}
						type="button"
					>
						Yes, delete item
					</button>
					<button
						className="confirmation-modal__button confirmation-modal__button_cancel"
						onClick={handleClose}
						type="button"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
