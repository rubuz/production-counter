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

  const getPercentMonth = (lineId) => {
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

  const percentMonth62100 = getPercentMonth(62100);
  const percentMonth62200 = getPercentMonth(62200);
  const percentMonth63000 = getPercentMonth(63000);
  const percentMonth63200 = getPercentMonth(63200);
  const percentMonth65200 = getPercentMonth(65200);
  const percentMonth65300 = getPercentMonth(65300);

  // console.log(percentMonth62200);

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
          <GraphDaily
            line62100={month ? percentMonth62100 : percentDay62100}
            line62200={month ? percentMonth62200 : percentDay62200}
            line63000={month ? percentMonth63000 : percentDay63000}
            line63200={month ? percentMonth63200 : percentDay63200}
            line65200={month ? percentMonth65200 : percentDay65200}
            line65300={month ? percentMonth65300 : percentDay65300}
          />
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
