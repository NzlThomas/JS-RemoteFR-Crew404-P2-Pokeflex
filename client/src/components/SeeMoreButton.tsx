import React, { useState } from "react";
import "./SeeMoreButton.css";

function SeeMoreButton() {
  const items = [
    { id: 1, name: "Pikatchu" },
    { id: 2, name: "Aquali" },
    { id: 3, name: "Bulbizarre" },
    { id: 4, name: "Salamèche" },
    { id: 5, name: "Carapuce" },
    { id: 6, name: "Dracaufeu" },
    { id: 7, name: "Florizarre" },
    { id: 8, name: "Carabaffe" },
    { id: 9, name: "Roucool" },
    { id: 10, name: "Abo" },
    { id: 11, name: "Onix" },
    { id: 12, name: "Pyroli" },
    { id: 13, name: "Doduo" },
    { id: 14, name: "Chenipan" },
    { id: 15, name: "Ortide" },
  ];
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleTitles = () => {
    setIsExpanded((prevState) => !prevState);
  };

  return (
    <div>
      <ul>
        {items.slice(0, isExpanded ? items.length : 12).map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={toggleTitles} type="button">
        {isExpanded ? "Voir -" : "Voir +"}
      </button>
    </div>
  );
}

export default SeeMoreButton;
