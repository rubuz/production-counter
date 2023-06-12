import sonicIcon from "./assets/sonic.png";
import "./App.css";
import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";

function App() {
  const url =
    "https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/63200";
  const token =
    "Basic UHJvaXp2b2RuamFXQ0ZTZWN1cmVVc2VyOjl1aFk4dm1kc1Z5WnRIQ0g4ZDVh";
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(url, {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.log(error);
      });
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

  // const config = {
  //   headers: {
  //     Authorization:
  //       "Basic UHJvaXp2b2RuamFXQ0ZTZWN1cmVVc2VyOjl1aFk4dm1kc1Z5WnRIQ0g4ZDVh",
  //   },
  // };
  // const url =
  //   "https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/63200";
  // const [data, setData] = useState([]);

  // const fetchData = () => {
  //   axios
  //     .get(url, config)
  //     .then((res) => setData(res))
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchData();

  //   const interval = setInterval(() => {
  //     fetchData();
  //     console.log(data);
  //   }, 2000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  const dayPlan = data.length > 0 ? data[0].planirano || 0 : 0;
  const monthPlan = data.length > 1 ? data[1].planirano || 0 : 0;
  const dayDone = data.length > 0 ? data[0].proizvedeno || 0 : 0;
  const monthDone = data.length > 1 ? data[1].proizvedeno || 0 : 0;

  // const dayPlan = 3;
  // const monthPlan = 20;
  // const dayDone = 0;
  // const monthDone = 0;

  // const [test, setTest] = useState(1);

  // const handleDayIncrement = () => {
  //   setTest((prevTest) => prevTest + 1);
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
          <p className="grid-item">
            <AnimateNumber value={dayDone} />
          </p>
          <p className="grid-item">{dayPlan}</p>
          <Progress className="progress" done={dayDone} plan={dayPlan} />
        </div>
        <h2 className="grid-item">MESEC</h2>
        <p className="grid-item">
          <AnimateNumber value={monthDone} />
        </p>
        <p className="grid-item">{monthPlan}</p>
        <Progress className="progress" done={monthDone} plan={monthPlan} />
      </main>
    </>
  );
}

export default App;
