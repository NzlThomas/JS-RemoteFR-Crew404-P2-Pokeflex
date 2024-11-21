import arrow from "../assets/images/arrow.png";
import "../Modal.css";

//typage de ma fonction closeModal (entre parenthèse closeModal peut avoir n'importe quel nom ça ne change pas le résultat), on dit qu'elle est de valeur boolean (true ou false) mais qu'elle
//ne retourne rien, donc fonction fléchée suivie de "void", si jamais on avait une fonction capitalize, elle retournerai un string par exemple donc on pourrait typer en disant "closeModal:  string;"
interface ModalProps {
  closeModal: (closeModal: boolean) => void;
  selectionData: {
    name: string;
    id: number;
    img: string;
    description: string;
    types: string[];
    hp: number;
    atk: number;
    atkSpe: number;
    def: number;
    defSpe: number;
    speed: number;
    cry: string;
    baseForm: string;
    secondForm?: string;
    thirdForm?: string;
    baseSprite: string;
    secondSprite?: string;
    thirdSprite?: string;
  };
}

function Modal({ closeModal, selectionData }: ModalProps) {
  //modification de l'état sur false pour que la modale ne soit plus affichée
  const handleClick = () => {
    closeModal(false);
  };

  //ici je déstructure mes props
  const {
    name,
    id,
    img,
    description,
    types,
    hp,
    atk,
    atkSpe,
    def,
    defSpe,
    speed,
    cry,
    baseForm,
    secondForm,
    thirdForm,
    baseSprite,
    secondSprite,
    thirdSprite,
  } = selectionData;

  return (
    <div className="modal-background">
      <div className="modal-container">
        <header className="name-button-container">
          <section className="name-container">
            <h1>{name}</h1>
            <h2>N°{id}</h2>
          </section>
          <div className="close-button-container">
            <button onClick={handleClick} type="button" id="close-button-style">
              X
            </button>
          </div>
        </header>

        <div className="entry-infos-container">
          <section className="sprite-type-container">
            <img alt={name} src={img} className="main-sprite" />
            <h3>{types.join("/")}</h3>
            <audio controls className="cry-button">
              <source src={cry} type="audio/ogg" />
              <track kind="captions" />
            </audio>
          </section>

          <div className="desc-stats-container">
            <p className="pokemon-description">{description}</p>
            <section className="pokemon-stats">
              <section className="stats-values">
                <p>{hp}</p>
                <h4>HP</h4>
              </section>
              <section className="stats-values">
                <p>{atk}</p>
                <h4>Atk</h4>
              </section>
              <section className="stats-values">
                <p>{atkSpe}</p>
                <h4>Spe. Atk</h4>
              </section>
              <section className="stats-values">
                <p>{def}</p>
                <h4>Def</h4>
              </section>
              <section className="stats-values">
                <p>{defSpe}</p>
                <h4>Spe. Def</h4>
              </section>
              <section className="stats-values">
                <p>{speed}</p>
                <h4>Speed</h4>
              </section>
            </section>
          </div>
        </div>

        <section className="evolution-container">
          <div className="evolution-entry">
            <h5>{baseForm}</h5>
            <img alt={baseForm} src={baseSprite} className="evolve-sprite" />
          </div>
          <img alt="flèche" src={arrow} className="evolution-arrow" />
          <div className="evolution-entry">
            <h5>{secondForm}</h5>
            <img
              alt={secondForm}
              src={secondSprite}
              className="evolve-sprite"
            />
          </div>
          <img alt="flèche" src={arrow} className="evolution-arrow" />
          <div className="evolution-entry">
            <h5>{thirdForm}</h5>
            <img alt={thirdForm} src={thirdSprite} className="evolve-sprite" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Modal;
