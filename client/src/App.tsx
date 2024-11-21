import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import Pokeclosed from "./components/PokeflexClosed";
import PokemonCards from "./components/PokemonCards";
import { SearchBar } from "./components/SearchBar";
import SearchPokemonType from "./components/SearchPokemonType";
import { SearchResultsList } from "./components/SearchResultsList";
import type {
  IndexType,
  PokemonTypeListResponse,
} from "./components/pokemonIndexType";
import TypeContext from "./contexts/TypeContext";
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
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0",
      );
      setNextUrl(res.data.next);

      // Promise.all pour garantir que chaque pokémon est récupéré dans l'ordre numérique
      const newPokemons = await Promise.all(
        res.data.results.map(async (pokemon: { name: string }) => {
          const poke = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
          );
          return poke.data;
        }),
      );
      setPokemons(newPokemons);
      setFilteredPokemons(newPokemons);
    };
    getPokemon();
  }, []);

  // Fonction pour gérer la recherche par type
  const [selectedType, setSelectedType] = useState<IndexType | null>(null);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonsByType = async (
      selectedType: IndexType | null,
      setFilteredPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>,
    ) => {
      if (!selectedType) return;

      try {
        const result = await axios.get<PokemonTypeListResponse>(
          selectedType.url,
        );

        if (result?.data?.pokemon) {
          const pokemonPromises = result.data.pokemon.map(async (p) => {
            const pokemonResponse = await axios.get(p.pokemon.url);
            return pokemonResponse.data;
          });
          const typedPokemons = await Promise.all(pokemonPromises);
          setFilteredPokemons(typedPokemons);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la recuperation des pokemons par type :",
          error,
        );
      }
    };
    if (selectedType) {
      fetchPokemonsByType(selectedType, setFilteredPokemons);
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [selectedType, pokemons]);

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
    if (!selectedType) {
      setFilteredPokemons((p) => [...p, ...newPokemons]);
    }
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
    <TypeContext.Provider value={{ selectedType, setSelectedType }}>
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
          <section className="app">
            <PokemonCards pokemons={filteredPokemons} />
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
    </TypeContext.Provider>
  );
}

export default App;
