import React, { useState, useEffect } from "react";
import "../styles/PokeList.css";
import { Modal } from "./Modal";

export function PokeList() {
  const numbersOfCards = 3;
  const numArr = [];
  const [pokemonList, setPokemonList] = useState([]);
  const [originalList, setOrgList] = useState([]);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("playing");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [instruction, setInstruction] = useState(
    "Observe the card order before clicking"
  );
  const [isOpen, setIsOpen] = useState(false);

  // Select random card ids to fetch
  while (numArr.length < numbersOfCards) {
    const randNum = Math.floor(Math.random() * 100) + 1;
    if (!numArr.includes(randNum)) numArr.push(randNum);
  }

  // Function to fetch the cards using above ids
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const promises = numArr.map(async (i) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        return res.json();
      });
      const pokemons = await Promise.all(promises);
      setPokemonList(pokemons);
      setOrgList(pokemons); // original list to check with every card click later}
    } catch (error) {
      setError("Failed to load pokemons. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Upon component mounting, fetch the cards
  useEffect(() => {
    fetchData();
  }, []);

  // Function to shuffle cards
  const shuffleCards = () => {
    const newPokeList = [...pokemonList];

    for (let i = newPokeList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPokeList[i], newPokeList[j]] = [newPokeList[j], newPokeList[i]];
    }
    setPokemonList(newPokeList);
  };

  // Function to handle game over
  const handleGameOver = () => {
    setIsOpen(true);
  };

  // Function to handle card click
  const clickCard = (e) => {
    if (count < pokemonList.length - 1) {
      setCount((c) => {
        const newCount = c + 1;
        const currentCard = newCount + 1;
        const orderSuffix =
          currentCard === 2 ? "nd" : currentCard === 3 ? "rd" : "th";
        setInstruction(`Select the initial ${currentCard}${orderSuffix} card`);
        return newCount;
      });
    }
    score === 0 && setScore((s) => s + 1);
    console.log(`count: ${count} ======================================`);

    if (count > 0) {
      if (e.currentTarget.id === originalList[count].name) {
        const newScore = score + 1;
        setScore(newScore);
        console.log("score:", newScore, "arr length:", pokemonList.length);
        if (newScore === pokemonList.length) {
          setGameState("won");
          handleGameOver();
        }
      } else {
        setGameState("lost");
        handleGameOver();
      }
    }
    shuffleCards();
  };

  // Function to reset game
  const resetGame = () => {
    setCount(0);
    setScore(0);
    setGameState("playing");
    setInstruction("Observe the card order before clicking");
    // Fetch a new set of pokemons
    fetchData();
    setIsOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="wrapper">
          <div className="title">PokeCard</div>
          <div className="gameInfo">
            <div className="score">
              Score: {score}/{numbersOfCards}
            </div>
            {gameState !== "playing" ? (
              <div className="gameOver">
                {gameState === "won" ? (
                  <div className="gameOverMsg">You won!</div>
                ) : (
                  <div className="gameOverMsg">Game over!</div>
                )}
              </div>
            ) : (
              <div>{instruction}</div>
            )}
          </div>
          <div className="cardList">
            {pokemonList.map((pokemon) => (
              <div
                key={pokemon.name}
                className="card"
                id={pokemon.name}
                onClick={(e) => {
                  clickCard(e);
                }}
              >
                <div>{pokemon.name}</div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={
          <div className="modal-gameOver">
            <div className="gameOver-msg">
              {gameState === "won" ? "You Won! 🎉" : "Game Over! 😢"}
            </div>
            <div>
              Final Score: {score}/{numbersOfCards}
            </div>
            <div className="playAgain">
              <button onClick={resetGame}>Play again</button>
            </div>
          </div>
        }
      />
    </>
  );
}
