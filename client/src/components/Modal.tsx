import { useEffect, useRef } from "react";
import arrow from "../assets/images/arrow.png";
import "./Modal.css";
import { IoCloseSharp } from "react-icons/io5";
import eeveelutions from "../assets/images/eeveelutions-image.png";

//typage de ma fonction closeModal (entre parenthèse closeModal peut avoir n'importe quel nom ça ne change pas le résultat), on dit qu'elle est de valeur boolean (true ou false) mais qu'elle
//ne retourne rien, donc fonction fléchée suivie de "void", si jamais on avait une fonction capitalize, elle retournerai un string par exemple donc on pourrait typer en disant "closeModal:  string;"
interface ModalProps {
  closeModal: (closeModal: boolean) => void;
  showFirstArrow: boolean;
  showSecondArrow: boolean;
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

function Modal({
  closeModal,
  selectionData,
  showFirstArrow,
  showSecondArrow,
}: ModalProps) {
  //constante qui permet de faire en sorte que l'audio du cri des pokémons soit au minimum par défaut
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
  }, []);
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

  // supprime les caractères non imprimables
  const cleanDescription = description.replace(/[^ -~]/g, " ");

  //J'initialise ma constante qui va contenir le premier type du pokémon sélectionné, elle servira de comparaison pour définir la couleur de fond du sprite
  const typeBg = types[0];

  return (
    <div
      className="modal-background"
      id={`${types[0] === typeBg ? `${typeBg}` : ""}`}
    >
      <div className="modal-container">
        <header className="name-button-container">
          <section
            className="name-container"
            id={`${types[0] === typeBg ? `${typeBg}` : ""}`}
          >
            <h1 className="capitalize-text">{name}</h1>
            <h2>N°{id}</h2>
          </section>
          <div className="close-button-container">
            <button onClick={handleClick} type="button" id="close-button-style">
              <IoCloseSharp
                onClick={handleClick}
                id="close-button-style"
                size={40}
              />
            </button>
          </div>
        </header>

        <div className="entry-infos-container">
          <section className="sprite-type-container">
            <img
              alt={name}
              src={img}
              className={`main-sprite ${types[0] === typeBg ? `${typeBg}` : ""}`}
            />
            <h3 className="capitalize-text type-list">{types.join("/")}</h3>
            <audio controls className="cry-button" ref={audioRef}>
              <source src={cry} type="audio/ogg" />
              <track kind="captions" />
            </audio>
          </section>

          <div className="desc-stats-container">
            <p className="pokemon-description">{cleanDescription}</p>
            <section className="pokemon-stats">
              <section className="stats-values">
                <p
                  className={
                    Number(hp) >= Number(100)
                      ? "high"
                      : Number(hp) >= Number(60)
                        ? "medium"
                        : Number(hp) < Number(60)
                          ? "low"
                          : ""
                  }
                >
                  {hp}
                </p>
                <h4>HP</h4>
              </section>
              <section className="stats-values">
                <p
                  className={
                    Number(atk) >= Number(100)
                      ? "high"
                      : Number(atk) >= Number(60)
                        ? "medium"
                        : Number(atk) < Number(60)
                          ? "low"
                          : ""
                  }
                >
                  {atk}
                </p>
                <h4>Atk</h4>
              </section>
              <section className="stats-values">
                <p
                  className={
                    Number(atkSpe) >= Number(100)
                      ? "high"
                      : Number(atkSpe) >= Number(60)
                        ? "medium"
                        : Number(atkSpe) < Number(60)
                          ? "low"
                          : ""
                  }
                >
                  {atkSpe}
                </p>
                <h4>Spe. Atk</h4>
              </section>
              <section className="stats-values">
                <p
                  className={
                    Number(def) >= Number(100)
                      ? "high"
                      : Number(def) >= Number(60)
                        ? "medium"
                        : Number(def) < Number(60)
                          ? "low"
                          : ""
                  }
                >
                  {def}
                </p>
                <h4>Def</h4>
              </section>
              <section className="stats-values">
                <p
                  className={
                    Number(defSpe) >= Number(100)
                      ? "high"
                      : Number(defSpe) >= Number(60)
                        ? "medium"
                        : Number(defSpe) < Number(60)
                          ? "low"
                          : ""
                  }
                >
                  {defSpe}
                </p>
                <h4>Spe. Def</h4>
              </section>
              <section className="stats-values">
                <p
                  className={
                    Number(speed) >= Number(100)
                      ? "high"
                      : Number(speed) >= Number(60)
                        ? "medium"
                        : Number(speed) < Number(60)
                          ? "low"
                          : ""
                  }
                >
                  {speed}
                </p>
                <h4>Speed</h4>
              </section>
            </section>
          </div>
        </div>

        <section
          className={`evolution-container ${!showFirstArrow && !showSecondArrow ? "one-sprite" : !showSecondArrow ? "two-sprites" : ""} ${id === Number(133) || id === Number(134) || id === Number(135) || id === Number(136) || id === Number(196) || id === Number(197) || id === Number(470) || id === Number(471) || id === Number(700) ? "display-none" : ""}`}
        >
          <div className="evolution-entry">
            <h5
              className={`evolution-name ${!showFirstArrow && !showSecondArrow ? "no-capitalize" : ""}`}
            >{`${!showFirstArrow && !showSecondArrow ? "This Pokémon has no evolutions." : `${baseForm}`}`}</h5>
            <img alt={baseForm} src={baseSprite} className="evolve-sprite" />
          </div>
          <img
            alt="flèche"
            src={arrow}
            className={`evolution-arrow ${!showFirstArrow ? "display-none" : ""}`}
          />
          <div className="evolution-entry">
            <h5 className="evolution-name">{secondForm}</h5>
            <img
              alt={secondForm}
              src={secondSprite}
              className="evolve-sprite"
            />
          </div>
          <img
            alt="flèche"
            src={arrow}
            className={`evolution-arrow ${!showSecondArrow ? "display-none" : ""}`}
          />
          <div
            className={`evolution-entry ${!showSecondArrow ? "display-none" : ""}`}
          >
            <h5 className="evolution-name">{thirdForm}</h5>
            <img alt={thirdForm} src={thirdSprite} className="evolve-sprite" />
          </div>
        </section>
        <section
          className={`evolution-container ${id === Number(133) || id === Number(134) || id === Number(135) || id === Number(136) || id === Number(196) || id === Number(197) || id === Number(470) || id === Number(471) || id === Number(700) ? "display-eevee" : "display-none"}`}
        >
          <img
            alt="List of Eevee's evolutions."
            src={eeveelutions}
            id="eeveelutions"
          />
        </section>
      </div>
    </div>
  );
}

export default Modal;
