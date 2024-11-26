import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";
import axios from "axios";
import { SearchResultsList } from "./SearchResultsList";

// Définition des interfaces pour les types de données
interface Pokemon {
  name: string;
  url: string;
}
interface Result {
  id: number;
  name: string;
}

// Définition des props attendues par le composant SearchBar
interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
  onKeyNavigation: (key: string) => void;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  showResults: boolean;
  results: Result[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  handleResultClick: (result: Result) => Promise<void>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  setResults,
  onKeyNavigation,
  setShowResults,
  showResults,
  results,
  selectedIndex,
  setSelectedIndex,
  handleResultClick,
}) => {
  // État local pour stocker la valeur de l'input
  const [input, setInput] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fonction pour récupérer les données de l'API
  const fetchData = async (value: string) => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 1302,
        },
      });
      const pokemons: Pokemon[] = response.data.results;
      const filteredResults = pokemons
        .filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(value.toLowerCase()),
        )
        .map((pokemon, index) => ({
          id: index + 1,
          name: pokemon.name,
        }));
      setResults(filteredResults);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setResults([]);
    }
  };

  // Gestion du changement de l'input
  const handleChange = (value: string) => {
    setInput(value);
    if (value.length >= 3 && value) {
      fetchData(value);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  // Gestion des touches de navigation + touche échap
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
      e.preventDefault();
      onKeyNavigation(e.key);
    }
    if (e.key === "Escape") {
      setShowResults(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => {
          setShowResults(false);
        }, 100);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowResults]);

  return (
    <div ref={wrapperRef} className="search-bar-wrapper">
      <div className="input-wrapper">
        <FaSearch id="search-icon" />
        <input
          placeholder="Rechercher un pokémon"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="search-results-container">
          {showResults && (
            <div className="search-result">
              <SearchResultsList
                results={results}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                onClick={handleResultClick}
                setShowResults={setShowResults}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
