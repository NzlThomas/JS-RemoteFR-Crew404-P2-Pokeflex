import { useState } from "react";
import "./PokeflexClosed.css";

const Pokeclosed = () => {
  const [isSplit, setIsSplit] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isHiddenBackground, setIsHiddenBackground] = useState(false);

  const handleClick = () => {
    if (!clicked) {
      setIsSplit((prevState) => !prevState);
      setClicked(true);

      setTimeout(() => {
        setIsHiddenBackground(true);
      }, 2000);
    }
  };

  return (
    <div className="background-container">
      <section
        className={`rectangle ${isSplit ? "split" : ""} ${
          clicked ? "clicked" : ""
        } ${isHiddenBackground ? "hidden-background" : ""}`}
      />
      <section
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
      >
        <section className="rectangle-part top-left" />
        <section className="rectangle-part top-right" />
        <section className="rectangle-part bottom-left" />
        <section className="rectangle-part bottom-right" />
        <section className="rectangle-part left" />
        <section className="rectangle-part right" />
        <section className={`pokeflex ${clicked ? "hidden" : ""}`}>
          Pokéflex
        </section>
      </section>
    </div>
  );
};

export default Pokeclosed;
