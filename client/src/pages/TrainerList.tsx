import trainersdata from "../../data/trainersdata.json";
import TrainerCards from "../components/Trainercards";
import "../components/Trainers.css";

function Trainerpage() {
  return (
    <main className="trainercards">
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
    </main>
  );
}

export default Trainerpage;
