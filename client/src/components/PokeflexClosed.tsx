import { useState } from "react";
import "./PokeflexClosed.css";

const Pokeclosed = () => {
  const [isHidden, setIsHidden] = useState(false);

  const handleClick = () => {
    setIsHidden(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      handleClick();
    }
  };

  return (
    <div className={`background-container ${isHidden ? "hidden" : ""}`}>
      <button
        className={`pokeflex ${isHidden ? "hidden" : ""}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-label="Pokéflex button"
        type="button"
      >
        Pokéflex
      </button>
    </div>
  );
};

export default Pokeclosed;
