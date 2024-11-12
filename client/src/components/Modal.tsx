import pikachu from "../assets/images/pikachu.jpg";
import "../Modal.css";

//typage de ma fonction closeModal (entre parenthèse closeModal peut avoir n'importe quel nom ça ne change pas le résultat), on dit qu'elle est de valeur boolean (true ou false) mais qu'elle
//ne retourne rien, donc fonction fléchée suivie de "void", si jamais on avait une fonction capitalize, elle retournerai un string par exemple donc on pourrait typer en disant "closeModal:  string;"
interface ModalProps {
  closeModal: (closeModal: boolean) => void;
}

function Modal({ closeModal }: ModalProps) {
  //modification de l'état pour fermer la modale au clic sur le bouton
  const handleClick = () => {
    closeModal(false);
  };

  return (
    <div className="modal-background">
      <div className="button-container">
        <button onClick={handleClick} type="button">
          X
        </button>
      </div>
      <div className="modal-container">
        <h1>Pikachu</h1>
        <img alt="pikachu" src={pikachu} className="modal-image" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse eligendi
          dolore voluptate quod quos nemo recusandae sed corrupti alias nulla
          unde minima quidem numquam, vel error nesciunt possimus blanditiis
          vitae.
        </p>
      </div>
    </div>
  );
}

export default Modal;
