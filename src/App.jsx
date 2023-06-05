import sonicIcon from "./assets/sonic.png";
import "./App.css";
import Progress from "./Progress";

function App() {
  return (
    <>
      <main>
        <div className="header-wrapper grid-item">
          <div className="img-container grid-item header-item-first">
            <img src={sonicIcon} alt="" />
          </div>
          <h1 className="grid-item">NAREJENO</h1>
          <h1 className="grid-item">PLAN</h1>
          <h1 className="grid-item header-item-last">%</h1>
        </div>
        <div className="second-wrapper">
          <h2 className="grid-item second-wrapper-first">DAN</h2>
          <p className="grid-item">5</p>
          <p className="grid-item">17</p>
          <Progress className="progress" />
        </div>
        <h2 className="grid-item">MESEC</h2>
        <p className="grid-item">5</p>
        <p className="grid-item">17</p>
        <Progress className="progress" />
      </main>
    </>
  );
}

export default App;
