import "./App.css";
import "./counter.css";
import "./sumCounter.css";
// import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";
import SideMenu from "./SideMenu";
import PropTypes from "prop-types";

const SumCounter = ({ logo }) => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here
  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            },
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch data for line ${lineId}`);
          }

          return response.json();
        }),
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

  useEffect(() => {
    fetchDataForAllLines();

    const interval = setInterval(() => {
      fetchDataForAllLines();
    }, 780000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //number color changer
  const numberColor = (done, plan) => {
    if (plan < done) {
      return "#2ecc71";
    } else if (plan > done) {
      return "#d20000";
    } else {
      return "var(--clr-text)";
    }
  };

  // icon click
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMenuIfOpen = () => {
    if (isMenuOpen) {
      setIsMenuOpen(!isMenuOpen);
    }
    return;
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
      onClick={toggleMenuIfOpen}
    >
      {/* <button onClick={handleDayIncrement}>TEST</button> */}
      <main className="main bg-amNeutral100 main-sum grid min-h-[100dvh] min-w-[100dvw] grid-cols-[150px_1fr_1fr] grid-rows-[200px_auto_auto] items-center justify-items-center overflow-hidden rounded-[50px]">
        <div className="contents">
          <div className="grid-item header-item group flex cursor-pointer items-center justify-center rounded-bl-[50px] transition-all duration-300 ease-in">
            <img
              src={logo}
              alt=""
              onClick={toggleMenu}
              className="group-hover:filter-iconHover w-[70%] transition-all duration-200 ease-in group-hover:scale-110"
            />
          </div>
          <h1 className="grid-item header-item font-numbers font-extrabold tracking-[4px]">
            REALIZIRANO
          </h1>
          <h1 className="grid-item header-item font-numbers rounded-br-[50px] font-extrabold tracking-[4px]">
            PLAN
          </h1>
          {/* <h1 className="grid-item header-item-last">%</h1> */}
        </div>
        <div className="contents">
          <h2 className="grid-item font-numbers text-amNeutral900 text-5xl font-extrabold [text-orientation:upright] [writing-mode:vertical-lr]">
            DAN
          </h2>
          <div
            className="grid-item px-8 text-[10rem] font-extrabold"
            style={{ color: numberColor(dayDone, dayPlan) }}
          >
            <AnimateNumber value={dayDone} />
          </div>
          <p className="grid-item px-8 text-[10rem] font-extrabold">
            {dayPlan}/{dayPlanEnd}
          </p>
          {/* <Progress className="progress" done={dayDone} plan={dayPlan} /> */}
        </div>
        <h2 className="grid-item font-numbers text-amNeutral900 text-5xl font-extrabold [text-orientation:upright] [writing-mode:vertical-lr]">
          MESEC
        </h2>
        <div
          className="grid-item px-8 text-[10rem] font-extrabold"
          style={{ color: numberColor(monthDone, monthPlan) }}
        >
          <AnimateNumber value={monthDone} />
        </div>
        <p className="grid-item px-8 text-[10rem] font-extrabold">
          {monthPlan}/{monthPlanCurrent}
        </p>
        {/* <Progress className="progress" done={monthDone} plan={monthPlan} /> */}
      </main>
      <div
        className={`side-menu fixed left-0 top-0 h-auto  bg-white ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} z-50 rounded-br-[2rem] transition-all duration-200 ease-in-out`}
      >
        <SideMenu />
      </div>
    </div>
  );
};

SumCounter.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default SumCounter;
