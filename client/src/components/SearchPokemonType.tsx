import { useState } from "react";
import "./SearchPokemonType.css";

function SearchPokemonType() {
  const [selectedType, setSelectedType] = useState("");

  const handleChange = (_event: { preventDefault: () => void }) => {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((reponse) => reponse.json())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <select
        name="selectedType"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option className="default-option" value={selectedType}>
          Rechercher par Type de Pokemon
        </option>

        <option value={selectedType} onChange={handleChange}>
          normal
        </option>

        <option value={selectedType} onChange={handleChange}>
          fighting
        </option>

        <option value={selectedType} onChange={handleChange}>
          flying
        </option>

        <option value={selectedType} onChange={handleChange}>
          poison
        </option>

        <option value={selectedType} onChange={handleChange}>
          ground
        </option>

        <option value={selectedType} onChange={handleChange}>
          rock
        </option>

        <option value={selectedType} onChange={handleChange}>
          bug
        </option>

        <option value={selectedType} onChange={handleChange}>
          ghost
        </option>

        <option value={selectedType} onChange={handleChange}>
          steel
        </option>

        <option value={selectedType} onChange={handleChange}>
          fire
        </option>

        <option value={selectedType} onChange={handleChange}>
          water
        </option>

        <option value={selectedType} onChange={handleChange}>
          grass
        </option>

        <option value={selectedType} onChange={handleChange}>
          electric
        </option>

        <option value={selectedType} onChange={handleChange}>
          psychic
        </option>

        <option value={selectedType} onChange={handleChange}>
          ice
        </option>

        <option value={selectedType} onChange={handleChange}>
          dragon
        </option>

        <option value={selectedType} onChange={handleChange}>
          dark
        </option>

        <option value={selectedType} onChange={handleChange}>
          fairy
        </option>

        <option value={selectedType} onChange={handleChange}>
          stellar
        </option>

        <option value={selectedType} onChange={handleChange}>
          unknown
        </option>
      </select>
    </div>
  );
}

export default SearchPokemonType;
