import { useEffect, useState } from "react";
import PokemonCardTest from "./components/PokemonCardTest";
import "./App.css";
import axios from "axios";
import Pokeclosed from "./components/PokeflexClosed";
import PokemonCards from "./components/PokemonCards";
import { SearchBar } from "./components/SearchBar";
import SearchPokemonType from "./components/SearchPokemonType";
import { SearchResultsList } from "./components/SearchResultsList";
import type { Pokemon } from "./interface";

// Définition de la structure d'un résultat de recherche
interface Result {
  id: number;
  name: string;
}

interface Pokemons {
  pokemon: string;
  name: string;
  url: string;
}
function App() {
  // État pour afficher les pokémons par défaut
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState("");

  useEffect(() => {
    const getPokemon = async () => {
      // Récupère la liste de mes 12 premiers pokémons
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0",
      );
      // Sauvegarde dans le state la prochaine URL pour obtenir les 12 suivants
      setNextUrl(res.data.next);

      // Promise.all pour garantir que chaque pokémon est récupéré dans l'ordre numérique
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

  // Fonction pour afficher les pokémons suivants
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

  // État pour gérer la recherche
  const [results, setResults] = useState<Result[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [showResults, setShowResults] = useState(false);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  // Gestion de la navigation au clavier
  const handleKeyNavigation = (key: string) => {
    if (key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (key === "Enter" && selectedIndex !== -1) {
      handleResultClick(results[selectedIndex]);
    }
  };

  // Gestion du clic sur un résultat
  const handleResultClick = (result: Result) => {
    setSelectedResult(result.name);
    setShowResults(false);
  };

  return (
    <div className="app-container">
      <section className="pokeclosed-section">
        <Pokeclosed />
      </section>
      <div className="app">
        <nav className="search-bar-container">
          <SearchBar
            setResults={setResults}
            onKeyNavigation={handleKeyNavigation}
            setShowResults={setShowResults}
          />
          <section className="rechercher-par-type">
            <SearchPokemonType />
          </section>
        </nav>

        {showResults && (
          <div className="search-result">
            <SearchResultsList
              results={results}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              setShowResults={setShowResults}
              onClick={handleResultClick}
            />
          </div>
        )}
        {selectedResult && <div>Résultat sélectionné: {selectedResult}</div>}
        <PokemonCardTest />
        <section className="app">
          <PokemonCards pokemons={pokemons} />
          <button
            onClick={handleNextPage}
            type="button"
            className="seemore-button-section"
          >
            Plus de pokémon
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
