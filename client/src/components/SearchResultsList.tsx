import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

interface Result {
  id: number;
  name: string;
}

// Définition des props attendues par le composant SearchResultsList
interface SearchResultsListProps {
  results: Result[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (result: Result) => void;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  results,
  selectedIndex,
  setSelectedIndex,
  onClick,
  setShowResults,
}) => {
  // Gestion de la sélection d'un résultat
  const handleSelect = (result: Result) => {
    onClick(result);
    setShowResults(false);
  };

  return (
    <div className="results-list">
      {results.map((result, index) => (
        <SearchResult
          key={result.id}
          result={result}
          isSelected={index === selectedIndex}
          onMouseEnter={() => setSelectedIndex(index)}
          onClick={() => handleSelect(result)}
        />
      ))}
    </div>
  );
};
