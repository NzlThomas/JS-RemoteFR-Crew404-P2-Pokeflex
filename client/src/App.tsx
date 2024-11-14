import PokemonCardTest from "./components/PokemonCardTest";
import { useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

// Définition de la structure d'un résultat de recherche
interface Result {
  id: number;
  name: string;
}

function App() {

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
    <div className="app">
      <PokemonCardTest />
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
    </div>
  );
}

export default App;
