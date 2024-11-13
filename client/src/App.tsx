import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCards from "./components/PokemonCards";
import type { Pokemon } from "./interface";

interface Pokemons {
  pokemon: string;
  name: string;
  url: string;
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      // Je récupère la liste de mes 12 premiers pokémons
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0",
      );
      // Je save dans mon state la prochaine URL pour avoir les 12 suivants
      setNextUrl(res.data.next);

      // Grâce à Promise.All je m'assure que chaque pokémon son dans l'ordre numérique.
      const newPokemons = await Promise.all(
        res.data.results.map(async (pokemon: Pokemons) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
          );
          return poke.data;
        }),
      );
      setPokemons(newPokemons);
    };
    getPokemon();
  }, []);

  // fonction pour que les pokemons suivants s'affichent
  const handleNextPage = async () => {
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    const newPokemons = await Promise.all(
      res.data.results.map(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        );
        return poke.data;
      }),
    );
    setPokemons((p) => [...p, ...newPokemons]);
  };

  return (
    <section className="app">
      <PokemonCards pokemons={pokemons} />
      <button onClick={handleNextPage} type="button" className="more-pokemon">
        Plus de Pokémons
      </button>
    </section>
  );
}

export default App;
