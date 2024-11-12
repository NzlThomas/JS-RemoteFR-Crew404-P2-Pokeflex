import React, { useState } from "react";
import SeeMoreButton from "./components/SeeMoreButton";
import "./App.css";
import Pokeclosed from "./components/PokeflexClosed";

function App() {
  return (
    <section className="App">
      <Pokeclosed />
      <h1> Liste des Pokémon</h1>
      <SeeMoreButton />
    </section>
  );
}

export default App;
