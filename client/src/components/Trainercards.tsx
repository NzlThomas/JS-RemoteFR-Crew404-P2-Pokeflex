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
    <>
      <article className="trainer-cards">
        <section className="trainerInfos">
          <div className="trainerPres">
            <h2 className="trainerName">{trainername}</h2>
            <img className="trainerImg" src={trainerimg} alt={trainername} />
          </div>
          <p className="trainerDescription">{trainerdescription}</p>
        </section>

        <section className="favPoke">
          <img src={trainerfav1} alt={`Pokémon préféré de${trainername}`} />
          <img src={trainerfav2} alt={`Pokémon préféré de${trainername}`} />
          <img src={trainerfav3} alt={`Pokémon préféré de${trainername}`} />
        </section>
      </article>
    </>
  );
}

export default TrainerCards;
