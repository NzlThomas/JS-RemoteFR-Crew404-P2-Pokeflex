import "./SearchResultsList.css";
import { useCallback, useEffect, useRef } from "react";
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
  // Gère le défilement automatique de la liste au clavier
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const element = listRef.current?.children[index] as HTMLElement;
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);

  useEffect(() => {
    if (selectedIndex >= 0) {
      scrollToIndex(selectedIndex);
    }
  }, [selectedIndex, scrollToIndex]);

  // Gestion de la sélection d'un résultat au clavier et souris
  const handleSelect = (result: Result) => {
    onClick(result);
    setShowResults(false);
  };

  return (
    <div className="results-list" ref={listRef}>
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
