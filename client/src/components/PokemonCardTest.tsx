import pikachu from "../assets/images/pikachu.jpg";
import "../PokemonCardTest.css";
import { useState } from "react";
import Modal from "./Modal";

function PokemonCardTest() {
  // création du state pour alterner entre false et true (donc modale cachée vs affichée)
  const [displayModal, setDisplayModal] = useState(false);

  // modification de l'état du state au click sur la card
  const handleClick = () => {
    setDisplayModal(true);
  };
  // modification de l'état du state en utilisant seulement le clavier pour l'accessibilité
  const handleKeyUp = () => {
    setDisplayModal(true);
  };

  return (
    <>
      <div className="card" onClick={handleClick} onKeyUp={handleKeyUp}>
        <h1>Pikachu</h1>
        <img alt="pikachu" src={pikachu} />
      </div>

      {displayModal && <Modal closeModal={setDisplayModal} />}
    </>
  );
}

export default PokemonCardTest;
