import "./SearchResult.css";

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
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {result.name}
    </button>
  );
};
