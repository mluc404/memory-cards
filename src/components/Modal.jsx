import "../styles/Modal.css";

export function Modal({
  type,
  isOpen,
  onClose,
  setNumberOfCards,
  gameState,
  score,
  numberOfCards,
  resetGame,
}) {
  if (!isOpen) return null;

  return (
    <>
      {type === "setting" && (
        <div className="modal-wrapper">
          <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-buttons">
                <div
                  className="game-setting easy"
                  onClick={() => {
                    setNumberOfCards(4);
                    resetGame();
                    onClose();
                  }}
                >
                  {">"} Easy
                </div>
                <div
                  className="game-setting medium"
                  onClick={() => {
                    setNumberOfCards(6);
                    resetGame();
                    onClose();
                  }}
                >
                  {">"} Medium
                </div>
                <button
                  className="modal-close"
                  onClick={onClose}
                  id="btn-close"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* END GAME MODAL */}

      {type === "endGame" && (
        <div className="modal-wrapper">
          <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="gameOver-msg">
                {gameState === "won" ? "You Won! 🎉" : "Game Over!"}
              </div>
              <div>
                Final Score: {score}/{numberOfCards}
              </div>
              <div className="modal-buttons">
                <button onClick={resetGame} id="btn-playAgain">
                  Play again
                </button>
                <button
                  className="modal-close"
                  onClick={onClose}
                  id="btn-close"
                >
                  x
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
