import { useState } from "react";
import "./PokeflexClosed.css";

const Pokeclosed = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isHiddenBackground, setIsHiddenBackground] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setIsSplit(true);
      setClicked(true);

      setTimeout(() => {
        setIsHiddenBackground(true);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
      handleClick();
    }
  };

  return (
    <div className="background-container">
      <button
        className={`rectangle ${isSplit ? "split" : ""} ${
          clicked ? "clicked" : ""
        } ${isHiddenBackground ? "hidden-background" : ""}`}
        onClick={handleClick}
        onKeyDown={handleKeyPress}
        type="button"
        aria-label="Pokéflex button"
      >
        <div className={`pokeflex ${clicked ? "hidden" : ""}`}>Pokéflex</div>
      </button>
    </div>
  );
};
export default Pokeclosed;
