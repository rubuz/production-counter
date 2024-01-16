import { useEffect, useState } from "react";
import GraphDaily from "./GraphDaily";
import GraphMonthly from "./GraphMonthly";
import SideMenu from "../SideMenu";
import "./graphs.css";
import GraphInfo from "./GraphInfo";

const Graphs = ({ logo }) => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here
  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [month, setMonth] = useState(false);

  // Colors for graphs
  const color62100 = "#FF5733";
  const color62200 = "#FFC300";
  const color63000 = "#abc480";
  const color63200 = "#C70039";
  const color65200 = "#900C3F";
  const color65300 = "#581845";

  const color62100under = "#FFAB80";
  const color62200under = "#FFDE80";
  const color63000under = "#ECFFB3";
  const color63200under = "#E6808A";
  const color65200under = "#C6808A";
  const color65300under = "#8A668A";

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

          const data = await response.json();
          return { lineId, data };
        })
      );

      const allData = responses.reduce((acc, { lineId, data }) => {
        acc[lineId] = data;
        return acc;
      }, {});

      setTotalData(allData);
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

  // Percent day - proizvedeno
  const getPercentDay = (lineId) => {
    return Object.keys(totalData).length > 0
      ? Math.round(totalData[lineId][0].procent) || 0
      : 0;
  };

  const percentDay62100 = getPercentDay(62100);
  const percentDay62200 = getPercentDay(62200);
  const percentDay63000 = getPercentDay(63000);
  const percentDay63200 = getPercentDay(63200);
  const percentDay65200 = getPercentDay(65200);
  const percentDay65300 = getPercentDay(65300);

  // Percent day - planirano
  const getPercentDayPlanned = (lineId) => {
    if (Object.keys(totalData).length > 0) {
      const percentMonth = Math.round(
        (totalData[lineId][0].planirano /
          Number(totalData[lineId][0].planirano_konec_dneva)) *
          100
      );
      return isNaN(percentMonth) ? 0 : percentMonth;
    }
    return 0;
  };

  const percentDay62100Planned = getPercentDayPlanned(62100);
  const percentDay62200Planned = getPercentDayPlanned(62200);
  const percentDay63000Planned = getPercentDayPlanned(63000);
  const percentDay63200Planned = getPercentDayPlanned(63200);
  const percentDay65200Planned = getPercentDayPlanned(65200);
  const percentDay65300Planned = getPercentDayPlanned(65300);

  // Percent month - proizvedeno
  const getPercentMonth = (lineId) => {
    if (Object.keys(totalData).length > 0) {
      const percentMonth = Math.round(
        (totalData[lineId][1].proizvedeno /
          Number(totalData[lineId][1].planirano_konec_dneva)) *
          100
      );
      return isNaN(percentMonth) ? 0 : percentMonth;
    }
    return 0;
  };

  const percentMonth62100 = getPercentMonth(62100);
  const percentMonth62200 = getPercentMonth(62200);
  const percentMonth63000 = getPercentMonth(63000);
  const percentMonth63200 = getPercentMonth(63200);
  const percentMonth65200 = getPercentMonth(65200);
  const percentMonth65300 = getPercentMonth(65300);

  // Percent month - planirano
  const getPercentMonthPlanned = (lineId) => {
    if (Object.keys(totalData).length > 0) {
      const percentMonth = Math.round(
        (totalData[lineId][1].planirano /
          Number(totalData[lineId][1].planirano_konec_dneva)) *
          100
      );
      return isNaN(percentMonth) ? 0 : percentMonth;
    }
    return 0;
  };

  const percentMonth62100Planned = getPercentMonthPlanned(62100);
  const percentMonth62200Planned = getPercentMonthPlanned(62200);
  const percentMonth63000Planned = getPercentMonthPlanned(63000);
  const percentMonth63200Planned = getPercentMonthPlanned(63200);
  const percentMonth65200Planned = getPercentMonthPlanned(65200);
  const percentMonth65300Planned = getPercentMonthPlanned(65300);

  // console.log(percentMonth62100);

  // console.log(totalData);

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

  // toggle day/month
  const toggleDay = () => {
    if (month) {
      setMonth(false);
    }
  };

  const toggleMonth = () => {
    setMonth(true);
  };

  return (
    <div
      className={`app ${isMenuOpen ? "menu-open" : ""}`}
      onClick={toggleMenuIfOpen}
    >
      <div className="main__graphs">
        <div className="graph__header">
          <div className="img-container">
            <img
              src={logo}
              alt=""
              onClick={toggleMenu}
              className="graph__img"
            />
          </div>
          <h1 className="header__text">GRAF</h1>

          {/* <h1 className="grid-item header-item-last">%</h1> */}
        </div>
        <div className="graph__container">
          <div className="graph__info">
            <div className="time__selector">
              <div
                onClick={toggleDay}
                className={month ? "btn-unactive" : "btn-active"}
              >
                <h3>Dan</h3>
              </div>
              <div
                onClick={toggleMonth}
                className={month ? "btn-active" : "btn-unactive"}
              >
                <h3>Mesec</h3>
              </div>
            </div>
            <GraphInfo
              line62100={month ? percentMonth62100 : percentDay62100}
              line62200={month ? percentMonth62200 : percentDay62200}
              line63000={month ? percentMonth63000 : percentDay63000}
              line63200={month ? percentMonth63200 : percentDay63200}
              line65200={month ? percentMonth65200 : percentDay65200}
              line65300={month ? percentMonth65300 : percentDay65300}
            />
          </div>
          <div className="graph__box">
            <div className="graph__under">
              <GraphDaily
                line62100={
                  month ? percentMonth62100Planned : percentDay62100Planned
                }
                line62100bg={"#f0f0f0"}
                line62100path={color62100under}
                line62200={
                  month ? percentMonth62200Planned : percentDay62200Planned
                }
                line62200bg={"#f0f0f0"}
                line62200path={color62200under}
                line63000={
                  month ? percentMonth63000Planned : percentDay63000Planned
                }
                line63000bg={"#f0f0f0"}
                line63000path={color63000under}
                line63200={
                  month ? percentMonth63200Planned : percentDay63200Planned
                }
                line63200bg={"#f0f0f0"}
                line63200path={color63200under}
                line65200={
                  month ? percentMonth65200Planned : percentDay65200Planned
                }
                line65200bg={"#f0f0f0"}
                line65200path={color65200under}
                line65300={
                  month ? percentMonth65300Planned : percentDay65300Planned
                }
                line65300bg={"#f0f0f0"}
                line65300path={color65300under}
              />
            </div>
            <div className="graph__over">
              <GraphDaily
                line62100={month ? percentMonth62100 : percentDay62100}
                line62100bg={"transparent"}
                line62100path={color62100}
                line62200={month ? percentMonth62200 : percentDay62200}
                line62200bg={"transparent"}
                line62200path={color62200}
                line63000={month ? percentMonth63000 : percentDay63000}
                line63000bg={"transparent"}
                line63000path={color63000}
                line63200={month ? percentMonth63200 : percentDay63200}
                line63200bg={"transparent"}
                line63200path={color63200}
                line65200={month ? percentMonth65200 : percentDay65200}
                line65200bg={"transparent"}
                line65200path={color65200}
                line65300={month ? percentMonth65300 : percentDay65300}
                line65300bg={"transparent"}
                line65300path={color65300}
              />
            </div>
          </div>

          {/* <GraphMonthly
        line62100={percentMonth62100}
        line62200={percentMonth62200}
        line63000={percentMonth63000}
        line63200={percentMonth63200}
        line65200={percentMonth65200}
        line65300={percentMonth65300}
      /> */}
        </div>
      </div>
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <SideMenu />
      </div>
    </div>
  );
};

export default Graphs;
