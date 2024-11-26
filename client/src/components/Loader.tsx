import LoaderAnimation from "../../public/anim_trainer_page.gif";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="load">
      <img className="imgload" src={LoaderAnimation} alt="Loading Animation" />
    </div>
  );
}
