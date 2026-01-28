import "./ConfirmationModal.css";

export default function ConfirmationModal({ isOpen, handleClose, onConfirm, itemName }) {
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
				<h2 className="modal__title">Confirm Deletion</h2>
				<p className="confirmation-modal__message">
					Are you sure you want to delete "{itemName}"? This action cannot be undone.
				</p>
				<div className="confirmation-modal__buttons">
					<button
						className="confirmation-modal__button confirmation-modal__button_confirm"
						onClick={onConfirm}
						type="button"
					>
						Yes, Delete
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
