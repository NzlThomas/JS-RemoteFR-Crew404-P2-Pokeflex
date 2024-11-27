import { useContext } from "react";
import TypeContext from "../contexts/TypeContext";
import PokemonType from "./pokemonIndexType";
import "./SearchPokemonType.css";

function SearchPokemonType() {
  const { selectedType, setSelectedType } = useContext(TypeContext);

  const handleSelectType = (typeName: string) => {
    if (typeName === "") {
      setSelectedType(null);
    } else {
      const selected =
        PokemonType.find((type) => type.name === typeName) || null;
      setSelectedType(selected);
    }
  };

  return (
    <select
      className="type-selector"
      name="selectedType"
      value={selectedType?.name || ""}
      onChange={(e) => handleSelectType(e.target.value)}
    >
      <option value="">Sélectionnez un type</option>
      {PokemonType.map((type) => (
        <option key={type.id} value={type.name}>
          {type.name}
        </option>
      ))}
    </select>
  );
}

export default SearchPokemonType;
