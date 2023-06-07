import sonicIcon from "./assets/sonic.png";
import "./App.css";
import Progress from "./Progress";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const url =
  //   "https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/63200";
  // fetch(url, {
  //   method: "GET",
  //   headers: {
  //     Authorization:
  //       "Basic UHJvaXp2b2RuamFXQ0ZTZWN1cmVVc2VyOjl1aFk4dm1kc1Z5WnRIQ0g4ZDVh",
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.log("ERROR");
  //   });

  const config = {
    headers: {
      Authorization:
        "Basic UHJvaXp2b2RuamFXQ0ZTZWN1cmVVc2VyOjl1aFk4dm1kc1Z5WnRIQ0g4ZDVh",
    },
  };
  // const url = "https://jsonplaceholder.typicode.com/users";
  const url =
    " https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/63200";
  const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios
      .get(url, config)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  console.log(data);

  const dayPlan = 20;
  const monthPlan = 232;

  const [dayDone, setDayDone] = useState(2);
  const [monthDone, setMonthDone] = useState(56);

  const handleDayIncrement = () => {
    setDayDone(dayDone + 1);
    setMonthDone(monthDone + 1);
  };

  return (
    <>
      {/* <button onClick={handleDayIncrement}>TEST</button> */}
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
        <p className="grid-item">
          <span>{monthDone}</span>
        </p>
        <p className="grid-item">{monthPlan}</p>
        <Progress className="progress" done={monthDone} plan={monthPlan} />
      </main>
    </>
  );
}

export default App;
