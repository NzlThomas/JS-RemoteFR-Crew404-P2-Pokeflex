import { useEffect, useState } from "react";
import PokemonCardTest from "./components/PokemonCardTest";
import "./App.css";
import axios from "axios";
import PokemonCards from "./components/PokemonCards";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";
import type { Pokemon } from "./interface";
import Pokeclosed from "./components/PokeflexClosed";
        
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
  // State pour afficher les pokémons par défault
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

  // État pour stocker les résultats de la recherche
  const [results, setResults] = useState<Result[]>([]);
  // État pour suivre l'index du résultat actuellement sélectionné
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  // État pour contrôler l'affichage de la liste des résultats potentiels
  const [showResults, setShowResults] = useState(false);
  // État pour afficher le résulat
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  // Gestion de la navigation au clavier
  const handleKeyNavigation = (key: string) => {
    if (key === "ArrowDown") {
      // Déplace la sélection vers le bas
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      // Déplace la sélection vers le haut
    } else if (key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (key === "Enter" && selectedIndex !== -1) {
      // Sélectionne le résultat actuel quand on appuie sur Entrée
      handleResultClick(results[selectedIndex]);
    }
  };

  // Gestion du clic sur un résultat
  const handleResultClick = (result: Result) => {
    setSelectedResult(result.name); // Met à jour l'état avec le résultat sélectionné
    setShowResults(false);
    // Ajouter ici la logique pour afficher le resultat de la recherche
  };

  return (
    <div className="app-container">
      <section className="pokeclosed-section">
        <Pokeclosed />
      </section>

      <div className="app">
        <div className="search-bar-container">
          <SearchBar
            setResults={setResults}
            onKeyNavigation={handleKeyNavigation}
            setShowResults={setShowResults}
          />

          {/* Affiche la liste des résultats seulement si showResults est true */}
          {showResults && (
            <SearchResultsList
              results={results}
              selectedIndex={selectedIndex}
              setSelectedIndex={setSelectedIndex}
              setShowResults={setShowResults}
              onClick={handleResultClick}
            />
          )}
          {/* Affiche le résultat sélectionné */}
          {selectedResult && <p>Sélection : {selectedResult}</p>}
        </div>
        <PokemonCardTest />
        <section className="app">
          <PokemonCards pokemons={pokemons} />
          <button onClick={handleNextPage} type="button" className="seemore-button-section">
            Plus de Pokémons
          </button>
        </section>
    </div>
   </div>
  );
}

export default App;
