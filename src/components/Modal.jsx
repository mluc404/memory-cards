import "../styles/Modal.css";

export function Modal({ isOpen, onClose, children, resetGame }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {children}

          <div className="modal-buttons">
            <button onClick={resetGame} id="btn-playAgain">
              Play again
            </button>
            <button className="modal-close" onClick={onClose} id="btn-close">
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
