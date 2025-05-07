import React, { useState, useEffect } from "react";
import "../styles/PokeList.css";

export function PokeList() {
  const pokemonQuantity = 5;
  const numArr = [];
  const [pokemonList, setPokemonList] = useState([]);

  while (numArr.length < pokemonQuantity) {
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

  return (
    <>
      <div className="pokemonList">
        {pokemonList.map((pokemon) => (
          <div key={pokemon.name} className="eachPokemon">
            <p>{pokemon.name}</p>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </>
  );
}
