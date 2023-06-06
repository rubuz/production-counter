import sonicIcon from "./assets/sonic.png";
import "./App.css";
import Progress from "./Progress";

function App() {
  const dayDone = 18;
  const dayPlan = 20;

  const monthDone = 56;
  const monthPlan = 232;

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
          <p className="grid-item">{dayDone}</p>
          <p className="grid-item">{dayPlan}</p>
          <Progress className="progress" done={dayDone} plan={dayPlan} />
        </div>
        <h2 className="grid-item">MESEC</h2>
        <p className="grid-item">{monthDone}</p>
        <p className="grid-item">{monthPlan}</p>
        <Progress className="progress" done={monthDone} plan={monthPlan} />
      </main>
    </>
  );
}

export default App;
