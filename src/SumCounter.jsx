import "./App.css";
import "./counter.css";
import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";
import SideMenu from "./SideMenu";

const SumCounter = ({ logo }) => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here
  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchDataForAllLines = async () => {
      try {
        // Use Promise.all() to fetch data for all production lines concurrently
        const responses = await Promise.all(
          productionLineIds.map(async (lineId) => {
            const response = await fetch(
              `https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/${lineId}`,
              {
                headers: {
                  Authorization:
                    "Basic UHJvaXp2b2RuamFXQ0ZTZWN1cmVVc2VyOjl1aFk4dm1kc1Z5WnRIQ0g4ZDVh",
                },
              }
            );

            if (!response.ok) {
              throw new Error(`Failed to fetch data for line ${lineId}`);
            }

            return response.json();
          })
        );

        // Process the responses to calculate the total sum for each metric
        const totalSum = {
          dayPlan: 0,
          dayPlanEnd: 0,
          dayDone: 0,
          monthPlan: 0,
          monthPlanCurrent: 0,
          monthDone: 0,
        };

        responses.forEach((responseData) => {
          if (responseData.length > 0) {
            totalSum.dayPlan += responseData[0].planirano || 0;
            totalSum.dayPlanEnd +=
              parseInt(responseData[0].planirano_konec_dneva) || 0;
            totalSum.dayDone += responseData[0].proizvedeno || 0;
          }
          if (responseData.length > 1) {
            totalSum.monthPlan += responseData[1].planirano || 0;
            totalSum.monthPlanCurrent +=
              parseInt(responseData[1].planirano_konec_dneva) || 0;
            totalSum.monthDone += responseData[1].proizvedeno || 0;
          }
        });

        // Update the total sum in the App component

        // Store all line data if needed
        setTotalData(totalSum);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataForAllLines();
    console.log(totalData);
  }, []);

  // useEffect(() => {
  //   fetchData();

  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 600000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  //number color changer
  const numberColor = (done, plan) => {
    if (plan < done) {
      return "#2ecc71";
    } else if (plan > done) {
      return "#d20000";
    } else {
      return "#000";
    }
  };

  // icon click
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dayPlan = totalData.dayPlan || 0;
  const dayPlanEnd = totalData.dayPlanEnd || 0;
  const dayDone = totalData.dayDone || 0;
  const monthPlan = totalData.monthPlan || 0;
  const monthPlanCurrent = totalData.monthPlanCurrent || 0;
  const monthDone = totalData.monthDone || 0;

  return (
    <div
      className={`app ${isMenuOpen ? "menu-open" : ""}`}
      onClick={toggleMenu}
    >
      {/* <button onClick={handleDayIncrement}>TEST</button> */}
      <main class="main">
        <div className="header-wrapper grid-item">
          <div className="img-container grid-item header-item-first">
            <img src={logo} alt="" onClick={toggleMenu} className="img-logo" />
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
          <Progress className="progress" done={dayDone} plan={dayPlan} />
        </div>
        <h2 className="grid-item">MESEC</h2>
        <div
          className="grid-item done-number"
          style={{ color: numberColor(monthDone, monthPlan) }}
        >
          <AnimateNumber value={monthDone} />
        </div>
        <p className="grid-item">
          {monthPlan}/{monthPlanCurrent}
        </p>
        <Progress className="progress" done={monthDone} plan={monthPlan} />
      </main>
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <SideMenu />
      </div>
    </div>
  );
};

export default SumCounter;
