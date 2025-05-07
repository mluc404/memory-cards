import React, { useState, useEffect } from "react";

export function PokeList() {
  const [pokeList, setPokeList] = useState([]);

  const fetchPokemon = async () => {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
    const data = await response.json();
    setPokeList(data.results);
  };

  const [tenPoke, setTenPoke] = useState([]);
  const getNewPokemon = () => {
    const selectedPoke = [];
    const ranNumArr = [];
    while (selectedPoke.length < 10) {
      const ranNum = Math.floor(Math.random() * 100);
      if (!ranNumArr.includes(ranNum)) {
        ranNumArr.push(ranNum);
        selectedPoke.push(pokeList[ranNum]);
      }
    }
    setTenPoke(selectedPoke);
  };

  useEffect(() => {
    fetchPokemon()
  }, []);
  
  useEffect(()=>{
    if(pokeList.length>0){
      getNewPokemon();
    }},[pokeList])

  return (
    <>
      {/* <button onClick={fetchPokemon}>Fetch</button> */}
      {/* <br></br> */}
      <button onClick={getNewPokemon}> Get 10 Pokemons</button>
      <ul>
        {tenPoke.length === 10 &&
          tenPoke.map((poke) => <li key={poke.name}>{poke.name}</li>)}
      </ul>
    </>
  );
}

// export function PokeList() {
//   const [pokemon, setPokemon] = useState(null);

//   useEffect(() => {
//     const fetchPokemon = async () => {
//       try {
//         const response = await fetch(
//           "https://pokeapi.co/api/v2/pokemon?limit=1"
//         );
//         const data = await response.json();
//         console.log(data);
//         setPokemon(data);
//       } catch (error) {
//         console.error("Error fetching pokemon:", error);
//       }
//     };

//     fetchPokemon();
//   }, []);

//   return (
//     <div>
//       {pokemon ? (
//         <pre>{JSON.stringify(pokemon, null, 2)}</pre>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }
