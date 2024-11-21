import pikachu from "../assets/images/pikachu.png";
import "../PokemonCardTest.css";
import { useState } from "react";
import Modal from "./Modal";

function PokemonCardTest() {
  // création du state pour alterner entre false et true (donc modale cachée vs affichée)
  const [displayModal, setDisplayModal] = useState(false);

  // lors du clic sur la card la variable est déclenchée, et elle passe l'état de setDisplayModal à true pour qu'elle soit affichée
  const handleClick = () => {
    setDisplayModal(true);
  };
  // modification de l'état du state en utilisant seulement le clavier pour l'accessibilité (touche tab puis entrer pour fermer)
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
