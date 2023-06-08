import sonicIcon from "./assets/sonic.png";
import "./App.css";
import Progress from "./Progress";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // const url =
  //   "https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/63200";
  // const url = "https://fakestoreapi.com/products/1";
  // fetch(url, {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Basic ProizvodnjaWCFSecureUser:9uhY8vmdsVyZtHCH8d5a",
  //     "Content-type": "application/json",
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
  const url =
    " https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/63200";
  const [data, setData] = useState({});

  const fetchData = () => {
    axios
      .get(url, config)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log("reload");

  const dayPlan = data[0].planirano || 0;
  const monthPlan = data[1].planirano || 0;
  const dayDone = data[0].proizvedeno || 0;
  const monthDone = data[1].proizvedeno || 0;

  // const handleDayIncrement = () => {
  //   setDayDone(dayDone + 1);
  //   setMonthDone(monthDone + 1);
  // };

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
