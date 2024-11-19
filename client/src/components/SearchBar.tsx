import { type KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";
import axios from "axios";

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
}

export const SearchBar: React.FC<SearchBarProps> = ({
  setResults,
  onKeyNavigation,
  setShowResults,
}) => {
  // État local pour stocker la valeur de l'input
  const [input, setInput] = useState("");

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
          pokemon.name.toLowerCase().includes(value.toLowerCase()),
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

  // Gestion des touches de navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter"].includes(e.key)) {
      e.preventDefault();
      onKeyNavigation(e.key);
    }
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Rechercher un pokémon"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
