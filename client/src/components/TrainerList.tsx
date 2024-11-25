import trainersdata from "../../data/trainersdata.json";
import TrainerCards from "./Trainercards";
import "../components/Trainers.css";

function Trainerpage() {
  return (
    <main className="trainers">
      <div className="trainersContent">
        <section className="trainersTitle">
          <h1>Pokémon Trainers</h1>
        </section>
        <section className="trainersCardsContainer">
        {trainersdata.map((trainer) => (
          <TrainerCards
            key={trainer.id}
            trainername={trainer.trainername}
            trainerimg={trainer.trainerimg}
            trainerdescription={trainer.trainerdescription}
            trainerfav1={trainer.trainerfav1}
            trainerfav2={trainer.trainerfav2}
            trainerfav3={trainer.trainerfav3}
          />      
        ))}
        </section>
      </div>

    </main>
  );
}

export default Trainerpage;
