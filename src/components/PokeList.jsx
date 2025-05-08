import React, { useState, useEffect } from "react";
import "../styles/PokeList.css";

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
      setOrgList(pokemons); // original list to check with every click later}
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

  // Function to handle card click
  const clickCard = (e) => {
    if (count < pokemonList.length - 1) setCount((c) => c + 1);
    score === 0 && setScore((s) => s + 1);

    console.log(`count: ${count} ======================================`);

    if (count > 0) {
      console.log(`current id: ${e.currentTarget.id}`);
      console.log(`prev id: ${originalList[count].name}`);
      if (e.currentTarget.id === originalList[count].name) {
        const newScore = score + 1;
        setScore(newScore);
        console.log("score:", newScore, "arr length:", pokemonList.length);
        if (newScore === pokemonList.length) {
          setGameState("won");
        }
      } else {
        setGameState("lost");
      }
    }
    shuffleCards();
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="wrapper">
          <div className="gameInfo">
            <div className="count">Click: {count}</div>
            <div className="score">Score: {score}</div>
            {gameState !== "playing" &&
              (gameState === "won" ? (
                <div>You won!</div>
              ) : (
                <div>Game over!</div>
              ))}
          </div>
          <div className="cardList">
            {pokemonList.map((pokemon) => (
              <div
                key={pokemon.name}
                className="eachPokemon"
                id={pokemon.name}
                onClick={(e) => {
                  clickCard(e);
                }}
              >
                <p>{pokemon.name}</p>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
