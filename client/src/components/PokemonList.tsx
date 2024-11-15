interface Props {
  name: string;
  id: number;
  img: string;
}

function PokemonList(props: Props) {
  const { name, id, img } = props;
  return (
    <div>
      <section className="pokemon-list-container">
        <p className="pokemon-name">{name}</p>
        <img src={img} alt={name} />
        <p className="pokemon-id"># {id}</p>
      </section>
    </div>
  );
}

export default PokemonList;
