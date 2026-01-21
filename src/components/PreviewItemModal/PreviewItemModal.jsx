import "./PreviewItemModal.css";

import ItemModal from "../ItemModal/ItemModal";

function PreviewItemModal({ isOpen, card, onClose }) {
  return <ItemModal isOpen={isOpen} card={card} onClose={onClose} />;
}

export default PreviewItemModal;
