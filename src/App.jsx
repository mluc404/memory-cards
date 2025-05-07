import { useState } from "react";
import "./App.css";
import { PokeList } from "./components/PokeList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PokeList />
    </>
  );
}

export default App;
