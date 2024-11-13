import { useState } from "react";
import "./PokeflexClosed.css";

function Pokeclosed() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div className="Pokéflex">
      <h1
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        className={isVisible ? "" : "hidden"}
      >
        Pokéflex
      </h1>
    </div>
  );
}

export default Pokeclosed;
