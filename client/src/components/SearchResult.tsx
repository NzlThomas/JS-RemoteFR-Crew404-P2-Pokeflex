import "./SearchResult.css";
import { useEffect, useState } from "react";

// Définition des props attendues par le composant SearchResult
interface Result {
  id: number;
  name: string;
}

interface SearchResultProps {
  result: Result;
  isSelected: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  result,
  isSelected,
  onMouseEnter,
  onClick,
}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick();
  };

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => setClicked(false), 200);
      return () => clearTimeout(timer);
    }
  }, [clicked]);

  // Gestion de l'appui sur la touche Entrée
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`search-result ${isSelected ? "selected" : ""}`}
      onMouseEnter={onMouseEnter}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {result.name}
    </button>
  );
};
