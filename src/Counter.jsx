import React from "react";
import "./App.css";
import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";

const Counter = ({ line, logo }) => {
  const url = `https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/${line}`;
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
    }, 600000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const dayPlan = data.length > 0 ? data[0].planirano || 0 : 0;
  const dayPlanEnd = data.length > 0 ? data[0].planirano_konec_dneva || 0 : 0;
  const monthPlan = data.length > 1 ? data[1].planirano || 0 : 0;
  const dayDone = data.length > 0 ? data[0].proizvedeno || 0 : 0;
  const monthDone = data.length > 1 ? data[1].proizvedeno || 0 : 0;

  const numberColor = (done, plan) => {
    if (plan < done) {
      return "#2ecc71";
    } else if (plan > done) {
      return "#d20000";
    } else {
      return "#000";
    }
  };

  return (
    <>
      {/* <button onClick={handleDayIncrement}>TEST</button> */}
      <main>
        <div className="header-wrapper grid-item">
          <div className="img-container grid-item header-item-first">
            <img src={logo} alt="" />
          </div>
          <h1 className="grid-item">REALIZIRANO</h1>
          <h1 className="grid-item">PLAN</h1>
          <h1 className="grid-item header-item-last">%</h1>
        </div>
        <div className="second-wrapper">
          <h2 className="grid-item second-wrapper-first">DAN</h2>
          <div
            className="grid-item done-number"
            style={{ color: numberColor(dayDone, dayPlan) }}
          >
            <AnimateNumber value={dayDone} />
          </div>
          <p className="grid-item">
            {dayPlan}/{dayPlanEnd}
          </p>
          <Progress className="progress" done={dayDone} plan={dayPlanEnd} />
        </div>
        <h2 className="grid-item">MESEC</h2>
        <div
          className="grid-item done-number"
          style={{ color: numberColor(monthDone, monthPlan) }}
        >
          <AnimateNumber value={monthDone} />
        </div>
        <p className="grid-item">{monthPlan}</p>
        <Progress className="progress" done={monthDone} plan={monthPlan} />
      </main>
    </>
  );
};

export default Counter;
