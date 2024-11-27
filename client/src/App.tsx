import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Pokeclosed from "./components/PokeflexClosed";
import PokemonCards from "./components/PokemonCards";
import { SearchBar } from "./components/SearchBar";
import SearchPokemonType from "./components/SearchPokemonType";
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

  // Fonction pour gérer la recherche par type
  const [selectedType, setSelectedType] = useState<IndexType | null>(null);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);

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
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${result.name}`,
      );
      setSelectedPokemon(response.data);
      setShowResults(false);
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
    <TypeContext.Provider value={{ selectedType, setSelectedType }}>
      <div className="app-container">
        <section className="pokeclosed-section">
          <Pokeclosed />
          <section className="pokeball-container" />
        </section>
        <div className="app">
          <nav className="search-bar-container" id="top-shortcut">
            <SearchBar
              setResults={setResults}
              onKeyNavigation={handleKeyNavigation}
              setShowResults={setShowResults}
              showResults={showResults}
              results={results}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              handleResultClick={handleResultClick}
            />
            <section className="rechercher-par-type">
              <SearchPokemonType />
            </section>
          </nav>

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
                <PokemonCards pokemons={filteredPokemons} />
                <button
                  onClick={handleNextPage}
                  type="button"
                  className="seemore-button-section"
                >
                  More Pokemons
                </button>
              </>
            )}
          </section>
        </div>
        <Link to="/trainers" className="lien-trainer">
          More about the different Pokémon Trainers here !
        </Link>
        <div id="up-button-container">
          <button type="button">
            <a href="#top-shortcut">Salut je suis un bouton up</a>
          </button>
        </div>
      </div>
    </TypeContext.Provider>
  );
}

export default App;
