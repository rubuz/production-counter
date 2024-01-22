import { useEffect, useState } from "react";
import GraphDaily from "./GraphDaily";
import SideMenu from "../SideMenu";
import GraphInfo from "./GraphInfo";
import LiveDateTime from "./LiveTime";
import PropTypes from "prop-types";

const Graphs = ({ logo }) => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here
  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [month, setMonth] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Colors for graphs
  const color62100 = "#FF5733";
  const color62200 = "#FFC300";
  const color63000 = "#abc480";
  const color63200 = "#C70039";
  const color65200 = "#3395ff";
  const color65300 = "#f70077";

  const color62100under = "#FFAB80";
  const color62200under = "#FFDE80";
  const color63000under = "#d7e8a2";
  const color63200under = "#E6808A";
  const color65200under = "#b3d8ff";
  const color65300under = "#ffa9d2";

  // API call
  const fetchDataForAllLines = async () => {
    setIsLoading(true);
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

          const data = await response.json();
          return { lineId, data };
        }),
      );

      const allData = responses.reduce((acc, { lineId, data }) => {
        acc[lineId] = data;
        return acc;
      }, {});

      setTotalData(allData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      if (initialLoad) setInitialLoad(false);
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
          100,
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
          100,
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
          100,
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

  // line selection
  const handleLineClick = (line) => {
    if (selectedLine === line) {
      setSelectedLine(null);
    } else {
      setSelectedLine(line);
    }
  };

  // console.log(selectedLine);

  return (
    <div
      className={`app ${isMenuOpen ? "menu-open" : ""}`}
      onClick={toggleMenuIfOpen}
    >
      <div className="main__graphs bg-amNeutral100 grid min-h-[100dvh] min-w-[100dvw] grid-cols-1 grid-rows-[200px_1fr] items-center justify-center overflow-hidden rounded-[50px]">
        <div className="grid h-[200px] w-full grid-cols-[150px_1fr_230px]">
          <div className="group flex cursor-pointer items-center justify-center rounded-bl-[50px] transition-all duration-300 ease-in">
            <img
              src={logo}
              alt=""
              onClick={toggleMenu}
              className="group-hover:filter-iconHover w-[70%] transition-all duration-200 ease-in group-hover:scale-110"
            />
          </div>
          <h1 className="place-self-center self-center text-[5.5rem] font-extrabold text-black">
            GRAF
          </h1>
          <LiveDateTime />
        </div>
        <div>
          {isLoading && initialLoad ? (
            <div className="text-center">
              <div
                role="status"
                className="flex items-center justify-center gap-6"
              >
                <svg
                  aria-hidden="true"
                  className="fill-amAccent inline h-16 w-16 animate-spin text-gray-200"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-3xl font-semibold">
                  Nalaganje podatkov...
                </span>
              </div>
            </div>
          ) : (
            <div className="grid h-full w-full grid-cols-2 grid-rows-1 items-center justify-center">
              <div className="h-full w-full p-8">
                <div className="flex cursor-pointer justify-center gap-8 py-4 text-5xl">
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
                  graphData={totalData}
                  onLineClick={handleLineClick}
                  selectedLine={selectedLine}
                />
              </div>
              <div className="relative w-full">
                <div className="z-[5] w-full">
                  <GraphDaily
                    month={month}
                    selectedLine={selectedLine}
                    graphData={totalData}
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
                <div className="absolute left-0 top-0 z-[1] w-full">
                  <GraphDaily
                    month={month}
                    selectedLine={selectedLine}
                    graphData={totalData}
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
            </div>
          )}
        </div>
      </div>
      <div
        className={`side-menu fixed left-0 top-0 h-auto  bg-white ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} z-50 rounded-br-[2rem] transition-all duration-200 ease-in-out`}
      >
        <SideMenu />
      </div>
    </div>
  );
};

Graphs.propTypes = {
  logo: PropTypes.string.isRequired,
};

export default Graphs;
