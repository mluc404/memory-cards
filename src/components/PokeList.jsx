import React, { useState, useEffect } from "react";
import "../styles/PokeList.css";

export function PokeList() {
  const numbersOfCards = 5;
  const numArr = [];
  const [pokemonList, setPokemonList] = useState([]);

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
  };

  useEffect(() => {
    fetchData();
  }, []);

  const shuffleCards = () => {
    const ranNumArr = [];
    const newPokeList = [...pokemonList];
    while (ranNumArr.length < pokemonList.length) {
      const randNum = Math.floor(Math.random() * pokemonList.length);
      if (!ranNumArr.includes(randNum)) ranNumArr.push(randNum);
    }
    console.log(ranNumArr);

    for (let i = 0; i < ranNumArr.length; i++) {
      newPokeList[i] = pokemonList[ranNumArr[i]];
    }

    setPokemonList(newPokeList);
  };

  return (
    <>
      <div className="pokemonList">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            className="eachPokemon"
            onClick={shuffleCards}
          >
            <p>{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </>
  );
}
