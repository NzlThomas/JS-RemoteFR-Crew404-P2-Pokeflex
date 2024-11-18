import type { Pokemon } from "../interface";
import PokemonList from "./PokemonList";
import "./PokemonCards.css";

interface Props {
  pokemons: Pokemon[];
}

function PokemonCards(Props: Props) {
  const { pokemons } = Props;

  return (
    <section className="pokemonlist">
      {pokemons.map((pokemon) => {
        return (
          <PokemonList
            key={pokemon.id}
            name={pokemon.name}
            id={pokemon.id}
            img={pokemon.sprites.front_default}
          />
        );
      })}
    </section>
  );
}

export default PokemonCards;
