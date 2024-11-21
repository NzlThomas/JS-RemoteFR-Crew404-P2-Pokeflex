import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
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
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

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
  const handleResultClick = async (result: Result) => {
    setShowResults(false);
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${result.name}`,
      );
      setSelectedPokemon(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du Pokémon:",
        error,
      );
      setSelectedPokemon(null);
    }
  };

  // Fonction pour réinitialiser la sélection
  const resetSelection = () => {
    setSelectedPokemon(null);
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

        <div className="search-results-container">
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
        </div>

        <section className="pokemon-display">
          {selectedPokemon ? (
            <>
              <PokemonCards pokemons={[selectedPokemon]} />
              <button
                onClick={resetSelection}
                type="button"
                className="reset-button"
              >
                Retour à la liste
              </button>
            </>
          ) : (
            <>
              <PokemonCards pokemons={pokemons} />
              <button
                onClick={handleNextPage}
                type="button"
                className="seemore-button-section"
              >
                Plus de pokémons
              </button>
            </>
          )}
        </section>
      </div>
      <Link to="/trainers">
        Découvrez en plus sur les différents Dresseurs ici !
      </Link>
    </div>
  );
}

export default App;
