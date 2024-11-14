//import axios from "axios";
import { useState} from "react";
import axios from "axios";
//import PokemonType from "./pokemonIndexType";



// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function SearchPokemonType(this: any) {
  const [selectedType, setSelectedType] = useState("");
  

 //reprendre video pour modifier handle change et la récup de l'Api


 //Ajouter des if pour conditionner le changement avec une variable(const) à récuperer dans les onChange
  const handleChange = () => {

    axios
      .get("https://pokeapi.co/api/v2/type/")
      .then((response) => setSelectedType(response.data))
      .catch((err) => console.error(err));
  } 





  return (
    <div>
      <select 
        name="selectedType" value={selectedType}
        onChange={e => setSelectedType(e.target.value)}>
        
        <option 
          value={selectedType}>
            Rechercher par Type de Pokemon
        </option>
        
        <option 
          value={selectedType}
          onChange={handleChange}>
            normal 
        </option>





        <option 
          value={selectedType}
          onChange={handleChange}>
            fighting
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            flying
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            poison
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            ground
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            rock 
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            bug
        </option>

        <option 
          value={selectedType}
          onChange={handleChange}>
            ghost
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            steel
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            fire
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            water
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            grass
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            electric
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            psychic
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            ice
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            dragon
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            dark
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            fairy
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            stellar
        </option>


        <option 
          value={selectedType}
          onChange={handleChange}>
            unknown
        </option>


      </select>

    </div>
  );
}


export default SearchPokemonType;