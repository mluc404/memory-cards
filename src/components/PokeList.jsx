import React, { useState, useEffect } from "react";
import "../styles/PokeList.css";
import { Modal } from "./Modal";
import pokeBall from "../assets/images/poke-ball-2.png";

export function PokeList() {
  const numbersOfCards = 4;
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
  const [isOpenIntro, setIsOpenIntro] = useState(false);
  const [showIndex, setShowIndex] = useState(true);

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
    setIsOpenIntro(true);
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
    setShowIndex(false);
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
    setIsOpenIntro(false);
    setShowIndex(true);
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="wrapper">
          <div className="heading" onClick={resetGame}>
            <span>
              <img src={pokeBall} id="pokeBall"></img>
            </span>
            <span className="gameTitle poke">Poke</span>
            <span className="gameTitle mind">Mind</span>
          </div>
          <div className="gameInfo">
            <div className="scoreAndSettings">
              <div className="score">
                Score: {score}/{numbersOfCards}
              </div>
              <button
                className="btn-setting"
                onClick={() => setIsOpenIntro(true)}
              >
                +
              </button>
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
              <div className="instruction">{instruction}</div>
            )}
          </div>
          <div className="cardList">
            {pokemonList.map((pokemon, index) => (
              <div
                key={pokemon.name}
                className="card"
                id={pokemon.name}
                onClick={(e) => {
                  clickCard(e);
                }}
              >
                <div className="pokemon-name">
                  {pokemon.name[0].toUpperCase()}
                  {pokemon.name.slice(1)}
                </div>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                {showIndex && <div>{index + 1}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpenIntro}
        onClose={() => setIsOpenIntro(false)}
        children={
          <div className="modal-gameOver">
            <div className="gameOver-msg">Welcome to PokeMind!</div>
            <div>Select Difficulty</div>
          </div>
        }
        resetGame={resetGame}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        children={
          <div className="modal-gameOver">
            <div className="gameOver-msg">
              {gameState === "won" ? "You Won! 🎉" : "Game Over!"}
            </div>
            <div>
              Final Score: {score}/{numbersOfCards}
            </div>
          </div>
        }
        resetGame={resetGame}
      />
    </>
  );
}
