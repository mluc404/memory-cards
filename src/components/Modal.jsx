import "../styles/Modal.css";

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}
          <button className="modal-close" onClick={onClose}>
            x
          </button>
        </div>
      </div>
    </div>
  );
}
