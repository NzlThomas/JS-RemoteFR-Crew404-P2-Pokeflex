interface TrainerInterface {
  trainername: string;
  trainerdescription: string;
  trainerimg: string;
  trainerfav1: string;
  trainerfav2: string;
  trainerfav3: string;
}

function TrainerCards({
  trainername,
  trainerdescription,
  trainerimg,
  trainerfav1,
  trainerfav2,
  trainerfav3,
}: TrainerInterface) {
  return (
    <section className="trainer-card">
      <h1>{trainername}</h1>
      <img className="trainerimg" src={trainerimg} alt={trainername} />
      <p>{trainerdescription}</p>
      <section className="favpoke">
        <img src={trainerfav1} alt={`Pokémon préféré de${trainername}`} />
        <img src={trainerfav2} alt={`Pokémon préféré de${trainername}`} />
        <img src={trainerfav3} alt={`Pokémon préféré de${trainername}`} />
      </section>
    </section>
  );
}

export default TrainerCards;
