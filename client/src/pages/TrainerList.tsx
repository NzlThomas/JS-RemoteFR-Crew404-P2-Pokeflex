import { useEffect, useState } from "react";
import trainersdata from "../../data/trainersdata.json";
import TrainerCards from "../components/Trainercards";
import "../components/Trainers.css";
import Loader from "../components/Loader";

function Trainerpage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Trainerpage;
