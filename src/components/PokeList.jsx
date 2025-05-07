import React, { useState, useEffect } from "react";
import "../styles/PokeList.css";

export function PokeList() {
  const numbersOfCards = 5;
  const numArr = [];
  const [pokemonList, setPokemonList] = useState([]);
  const [prevList, setPrevList] = useState([]);
  const [originalList, setOrgList] = useState([]);

  while (numArr.length < numbersOfCards) {
    const randNum = Math.floor(Math.random() * 100) + 1;
    if (!numArr.includes(randNum)) numArr.push(randNum);
  }

  const fetchData = async () => {
    const promises = numArr.map(async (i) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      return res.json();
    });

    const pokemons = await Promise.all(promises);
    setPokemonList(pokemons);
    setOrgList(pokemons);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shuffleCards = () => {
    const ranNumArr = [];
    const newPokeList = [...pokemonList];

    for (let i = newPokeList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPokeList[i], newPokeList[j]] = [newPokeList[j], newPokeList[i]];
    }
    setPokemonList(newPokeList);
  };

  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const clickCard = (e) => {
    if (count < pokemonList.length - 1) setCount((c) => c + 1);
    score === 0 && setScore((s) => s + 1);

    console.log(`count: ${count} ======================================`);

    if (count > 0) {
      console.log(`current id: ${e.currentTarget.id}`);
      console.log(`prev id: ${originalList[count].name}`);
      if (e.currentTarget.id === originalList[count].name) {
        setScore((s) => s + 1);
      }
    }
    shuffleCards();
  };

  return (
    <>
      <div className="count">Click: {count}</div>
      <div className="score">Score: {score}</div>
      <div className="pokemonList">
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
    </>
  );
}
