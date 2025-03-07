import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import "./Types.css";
import { useEffect } from "react";

interface PokemonProps {
  name: string;
  id: number;
  img: string;
}

function PokemonList(props: PokemonProps) {
  const { name, id, img } = props;

  //ma modale alterne entre avoir des données et ne pas en avoir (donc avant que je clique sur une card et après avoir cliqué)
  //quand je clique : elle accepte un nom, un id et une image, quand je n'ai pas cliqué et qu'elle n'est pas affichée son état est null
  //si je ne précise pas que son état peut être égal à null, on aura une erreur car le code va chercher un name, un id et une image (que modalData ne contient pas encore du coup)
  //c'est pour ça que je mets (null) car ça signifie que l'état par défaut de mon state ne contient rien
  const [modalData, setModalData] = useState<{
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
  } | null>(null);

  //je déclare mes deux states qui vont alterner entre true et false pour définir si on affiche la flèche dans la partie évolution
  const [showFirstArrow, setShowFirstArrow] = useState(false);
  const [showSecondArrow, setShowSecondArrow] = useState(false);
  // création du state pour alterner entre false et true (donc modale cachée vs affichée)
  const [displayModal, setDisplayModal] = useState(false);
  //création d'un state qui va stocker le type du pokémon dès l'arrivée sur le pokéflex
  const [typeBorder, setTypeBorder] = useState<string | null>(null);
  //le useeffect est trigger directement pour récupérer le type sans avoir besoin d'une action de l'utilisateur
  //comme pour le handleclick on récupère uniquement la première entrée du tableau (donc bulbizarre apparaîtra en vert car son premier type est herbe dans l'api)
  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const typePokemon = res.data.types;
        const typesList = typePokemon.map(
          (typeInfo: { type: { name: string } }) => typeInfo.type.name,
        );
        setTypeBorder(typesList[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchType();
  }, [id]);

  // lors du clic sur la card la constante est déclenchée, et elle passe l'état de setDisplayModal à true pour qu'elle soit affichée et donne les données nécessaire à l'affichage de la modale
  const handleClick = async () => {
    try {
      setDisplayModal(true);
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${name}`,
      );
      //je récupère la description du pokémon en anglais
      const descriptionPokemon = res.data.flavor_text_entries.find(
        (element: { language: { name: string } }) =>
          element.language.name === "en",
      );
      //je récupère le ou les types des pokémons
      const res2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const typePokemon = res2.data.types;

      const typesList = typePokemon.map(
        (typeInfo: { type: { name: string } }) => typeInfo.type.name,
      );

      // const typeBg = typesList[0];
      // const test = typesList;

      //je crée une constante pour chaque statistique
      const hp = res2.data.stats[0].base_stat;
      const atk = res2.data.stats[1].base_stat;
      const atkSpe = res2.data.stats[3].base_stat;
      const def = res2.data.stats[2].base_stat;
      const defSpe = res2.data.stats[4].base_stat;
      const speed = res2.data.stats[5].base_stat;

      //je récupère le cri du pokémon
      const cry = res2.data.cries.legacy;

      //je déclare mes variables qui vont contenir les noms des pokémons (baseForm, secondForm et thirdForm) ET les variables qui vont contenir les sprites (baseSprite...)
      let baseForm = null;
      let secondForm = null;
      let thirdForm = null;
      let baseSprite = null;
      let secondSprite = null;
      let thirdSprite = null;

      //je récupère les chaînes d'évolutions en fonction de l'id du pokémon
      try {
        const speciesResponse = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
        );
        const speciesData = speciesResponse.data;

        const evolutionChainUrl = speciesData.evolution_chain?.url;
        if (evolutionChainUrl) {
          const evolutionResponse = await axios.get(evolutionChainUrl);
          const evolutionData = evolutionResponse.data;

          //je récupère le nom de la forme de base du pokémon
          baseForm = evolutionData.chain.species.name;
          //je retrouve la page api de base en pokemon/nom
          const pokemonHome = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${baseForm}/`,
          );
          //je récupère le sprite du pokémon et le stocke dans ma variable
          baseSprite = pokemonHome.data.sprites.front_default;
          //
          //
          //
          //
          //je récupère le nom de la second évolution du pokémon
          secondForm = evolutionData.chain?.evolves_to[0]?.species?.name;
          //je retrouve la page api de base en pokemon/nom
          if (secondForm) {
            const secondPokemonHome = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${secondForm}/`,
            );
            //je récupère le sprite du pokémon et le stocke dans ma variable
            secondSprite = secondPokemonHome.data.sprites.front_default;

            setShowFirstArrow(true);
          }
          //
          //
          //
          //
          //je récupère le nom de la forme de base du pokémon
          thirdForm =
            evolutionData.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;
          //je retrouve la page api de base en pokemon/nom
          if (thirdForm) {
            const thirdPokemonHome = await axios.get(
              `https://pokeapi.co/api/v2/pokemon/${thirdForm}/`,
            );
            //je récupère le sprite du pokémon et le stocke dans ma variable
            thirdSprite = thirdPokemonHome.data.sprites.front_default;

            setShowSecondArrow(true);
          }
        } else {
          console.error("L'URL de la chaîne d'évolution est manquante");
        }
      } catch (err) {
        console.error(err);
      }

      //je dis quelles données vont être contenues dans le state de modalData
      return setModalData({
        name,
        id,
        img,
        description: descriptionPokemon.flavor_text,
        types: typesList,
        hp,
        atk,
        atkSpe,
        def,
        defSpe,
        speed,
        cry: cry,
        baseForm: baseForm,
        secondForm: secondForm || null,
        thirdForm: thirdForm || null,
        baseSprite: baseSprite || null,
        secondSprite: secondSprite || null,
        thirdSprite: thirdSprite || null,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // modification de l'état du state en utilisant seulement le clavier pour l'accessibilité (touche tab puis entrer pour fermer)
  const handleKeyUp = () => {
    setDisplayModal(true);
  };
  return (
    <div>
      <section
        className="pokemon-list-container"
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        id={typeBorder ? typeBorder : ""}
      >
        <p className="pokemon-name">{name}</p>
        <img src={img} alt={name} />
        <p className="pokemon-id"># {id}</p>
      </section>
      {displayModal && modalData && (
        <Modal
          closeModal={setDisplayModal}
          selectionData={modalData}
          showFirstArrow={showFirstArrow}
          showSecondArrow={showSecondArrow}
        />
      )}
    </div>
  );
}

export default PokemonList;
