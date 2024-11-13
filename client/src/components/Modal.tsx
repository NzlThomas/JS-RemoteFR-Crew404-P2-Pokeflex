import pichu from "../assets/images/pichu.png";
import pikachu from "../assets/images/pikachu.png";
import raichu from "../assets/images/raichu.png";
import arrow from "../assets/images/arrow.png";
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
      <div className="modal-container">
        <header className="name-button-container">
          <section className="name-container">
            <h1>Pikachu</h1>
            <h2>N°X</h2>
          </section>
          <div className="close-button-container">
            <button onClick={handleClick} type="button" id="close-button-style">
              X
            </button>
          </div>
        </header>

        <div className="entry-infos-container">
          <section className="sprite-type-container">
            <img alt="pikachu" src={pikachu} className="main-sprite" />
            <h3>Électrik</h3>
            <button type="button" className="cry-button">
              Appuyez pour <br /> entendre le cri
            </button>
          </section>

          <div className="desc-stats-container">
            <p>
              Pikachu est un pikachu, oui c'est une belle description mais c'est
              juste pour combler, oui je mets pas de lorem et alors ?
            </p>
            <section className="pokemon-stats">
              <section className="stats-values">
                <p>35</p>
                <h4>PV</h4>
              </section>
              <section className="stats-values">
                <p>55</p>
                <h4>Atk</h4>
              </section>
              <section className="stats-values">
                <p>50</p>
                <h4>Atk Spé.</h4>
              </section>
              <section className="stats-values">
                <p>40</p>
                <h4>Déf</h4>
              </section>
              <section className="stats-values">
                <p>50</p>
                <h4>Déf Spé.</h4>
              </section>
              <section className="stats-values">
                <p>90</p>
                <h4>Vitesse</h4>
              </section>
            </section>
          </div>
        </div>

        <section className="evolution-container">
          <div className="evolution-entry">
            <h5>Pichu</h5>
            <img alt="pichu" src={pichu} className="evolve-sprite" />
          </div>
          <img alt="flèche" src={arrow} className="evolution-arrow" />
          <div className="evolution-entry">
            <h5>Pikachu</h5>
            <img alt="pikachu" src={pikachu} className="evolve-sprite" />
          </div>
          <img alt="flèche" src={arrow} className="evolution-arrow" />
          <div className="evolution-entry">
            <h5>Raichu</h5>
            <img alt="raichu" src={raichu} className="evolve-sprite" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Modal;
