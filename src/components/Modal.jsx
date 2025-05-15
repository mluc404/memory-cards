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
  animation,
}) {
  if (!isOpen) return null;

  return (
    <>
      {type === "setting" && (
        <div className="modal-wrapper setting">
          <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div>Welcome to PokeMind, a memory card game</div>
              <div>Select Difficulty:</div>
              <div className="modal-buttons settings">
                <div
                  className="game-setting easy"
                  onClick={() => {
                    setNumberOfCards(4);
                    resetGame();
                    onClose();
                  }}
                >
                  {">"} I'm just a chill guy
                </div>
                <div
                  className="game-setting medium"
                  onClick={() => {
                    setNumberOfCards(6);
                    resetGame();
                    onClose();
                  }}
                >
                  {">"} I like a challenge
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ///////////////////////////////////////////////// */}
      {/* ////////////////////////////////////////////////// */}
      {/* END GAME MODAL */}
      {type === "endGame" && (
        <div className="modal-wrapper endGame">
          <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-info">
                {gameState === "won" ? (
                  <div className="modal-info-result won">
                    <div className="gameOver-msg">You Won! 🎉</div>
                    <img src={animation.win} alt="happy pikachu" />
                  </div>
                ) : (
                  <div className="modal-info-result lost">
                    <div className="gameOver-msg">Game Over!</div>
                    <img src={animation.lost} alt="sad pikachu" />
                  </div>
                )}
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
