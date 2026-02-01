import { useEffect } from "react";

/**
 * Hook to close modal when Escape key is pressed
 */
export const useEscapeKey = (isOpen, onClose) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleEsc = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEsc);
		return () => document.removeEventListener("keydown", handleEsc);
	}, [isOpen, onClose]);
};

/**
 * Factory function to create overlay click handler that closes modal when clicking outside
 */
export const createOverlayClickHandler = (onClose) => {
	return (event) => {
		if (event.target === event.currentTarget) {
			onClose();
		}
	};
};
