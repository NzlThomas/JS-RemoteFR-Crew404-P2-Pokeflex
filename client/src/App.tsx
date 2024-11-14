import SeeMoreButton from "./components/SeeMoreButton";
import "./App.css";
import Pokeclosed from "./components/PokeflexClosed";

function App() {
  return (
    <div className="app-container">
      <section className="pokeclosed-section">
        <Pokeclosed />
      </section>
      <section className="seemore-button-section">
        <SeeMoreButton />
      </section>
    </div>
  );
}

export default App;
