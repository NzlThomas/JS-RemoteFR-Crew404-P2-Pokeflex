import { type KeyboardEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";

// Définition des interfaces pour les types de données
interface Pokemon {
  name: string;
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
  const fetchData = (value: string) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((Response) => Response.json())
      .then((json) => {
        // Filtre les résultats en fonction de la valeur d'entrée
        const results = json.filter((user: Pokemon) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  // Gestion du changement de l'input
  const handleChange = (value: string) => {
    setInput(value);
    fetchData(value);
    setShowResults(value.length > 0);
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
