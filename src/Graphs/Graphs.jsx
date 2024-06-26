import { useEffect, useState } from "react";
import GraphDaily from "./GraphDaily";
import SideMenu from "../SideMenu";
import GraphInfo from "./GraphInfo";
import LiveDateTime from "./LiveTime";
import PropTypes from "prop-types";
import ActivityIndicator from "../ActivityIndicator";

const Graphs = ({ logo }) => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here

  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [month, setMonth] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const token = import.meta.env.VITE_API_TOKEN;
  const url = import.meta.env.VITE_API_URL;

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
          const response = await fetch(url + `${lineId}`, {
            headers: {
              Authorization: token,
            },
          });

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

  // Percent day - tekoci plan - proizvedeno
  const getPercentDayCurrentPlan = (lineId) => {
    if (Object.keys(totalData).length > 0) {
      const percentDay = Math.round(
        (totalData[lineId][0].proizvedeno /
          Number(totalData[lineId][0].planirano)) *
          100,
      );
      return isNaN(percentDay) ? 0 : percentDay;
    }
    return 0;
  };

  const percentDay62100CurrentPlan = getPercentDayCurrentPlan(62100);
  const percentDay62200CurrentPlan = getPercentDayCurrentPlan(62200);
  const percentDay63000CurrentPlan = getPercentDayCurrentPlan(63000);
  const percentDay63200CurrentPlan = getPercentDayCurrentPlan(63200);
  const percentDay65200CurrentPlan = getPercentDayCurrentPlan(65200);
  const percentDay65300CurrentPlan = getPercentDayCurrentPlan(65300);

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

  // Percent month - tekoci plan - proizvedeno
  const getPercentMonthCurrentPlan = (lineId) => {
    if (Object.keys(totalData).length > 0) {
      const percentMonth = Math.round(
        (totalData[lineId][1].proizvedeno /
          Number(totalData[lineId][1].planirano)) *
          100,
      );
      return isNaN(percentMonth) ? 0 : percentMonth;
    }
    return 0;
  };

  const percentMonth62100CurrentPlan = getPercentMonthCurrentPlan(62100);
  const percentMonth62200CurrentPlan = getPercentMonthCurrentPlan(62200);
  const percentMonth63000CurrentPlan = getPercentMonthCurrentPlan(63000);
  const percentMonth63200CurrentPlan = getPercentMonthCurrentPlan(63200);
  const percentMonth65200CurrentPlan = getPercentMonthCurrentPlan(65200);
  const percentMonth65300CurrentPlan = getPercentMonthCurrentPlan(65300);

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
      <div className="main__graphs grid min-h-[100dvh] min-w-[100dvw] grid-cols-1 grid-rows-[150px_1fr] items-center justify-center overflow-hidden rounded-[50px] bg-amNeutral100 2xl:grid-rows-[200px_1fr]">
        <div className="grid h-[100px] w-full grid-cols-[150px_1fr_230px] 2xl:h-[200px]">
          <div className="group flex cursor-pointer items-center justify-center rounded-bl-[50px] transition-all duration-300 ease-in">
            <img
              src={logo}
              alt="logo"
              onClick={toggleMenu}
              className="group-hover:filter-iconHover w-[50%] transition-all duration-200 ease-in group-hover:scale-110 2xl:w-[70%]"
            />
          </div>
          <h1 className="place-self-center self-center text-6xl font-extrabold text-black 2xl:text-[5.5rem]">
            GRAF
          </h1>
          <LiveDateTime />
        </div>
        <div>
          {isLoading && initialLoad ? (
            <ActivityIndicator />
          ) : (
            <div className="h-full w-full items-center justify-center 2xl:grid 2xl:grid-cols-2 2xl:grid-rows-1">
              <div className="h-full w-full p-8">
                <div className="flex cursor-pointer justify-center gap-8 text-3xl max-2xl:pb-10 2xl:py-4 2xl:text-5xl">
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
                {/* <GraphInfo
                  line62100={month ? percentMonth62100 : percentDay62100}
                  line62200={month ? percentMonth62200 : percentDay62200}
                  line63000={month ? percentMonth63000 : percentDay63000}
                  line63200={month ? percentMonth63200 : percentDay63200}
                  line65200={month ? percentMonth65200 : percentDay65200}
                  line65300={month ? percentMonth65300 : percentDay65300}
                  graphData={totalData}
                  onLineClick={handleLineClick}
                  selectedLine={selectedLine}
                /> */}
                <GraphInfo
                  line62100={
                    month
                      ? percentMonth62100CurrentPlan
                      : percentDay62100CurrentPlan
                  }
                  line62200={
                    month
                      ? percentMonth62200CurrentPlan
                      : percentDay62200CurrentPlan
                  }
                  line63000={
                    month
                      ? percentMonth63000CurrentPlan
                      : percentDay63000CurrentPlan
                  }
                  line63200={
                    month
                      ? percentMonth63200CurrentPlan
                      : percentDay63200CurrentPlan
                  }
                  line65200={
                    month
                      ? percentMonth65200CurrentPlan
                      : percentDay65200CurrentPlan
                  }
                  line65300={
                    month
                      ? percentMonth65300CurrentPlan
                      : percentDay65300CurrentPlan
                  }
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
                    onLineClick={handleLineClick}
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
                    onLineClick={handleLineClick}
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
