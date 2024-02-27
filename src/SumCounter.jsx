import "./counter.css";
// import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";
import SideMenu from "./SideMenu";
import PropTypes from "prop-types";
import LiveTimeCounter from "./LiveTimeCounter";
import ActivityIndicator from "./ActivityIndicator";
import { useMediaQuery } from "react-responsive";
import LiveDateTime from "./Graphs/LiveTime";

const SumCounter = ({ logo, line }) => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here
  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Responsive displays
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });

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
      {isBigScreen ? (
        <main
          className={`main main-sum grid min-h-[100dvh] min-w-[100dvw] grid-cols-[150px_1fr_1fr] ${isLoading && initialLoad ? "grid-rows-[200px_auto]" : "grid-rows-[200px_auto_auto]"} items-center justify-items-center overflow-hidden rounded-[50px] bg-amNeutral100`}
        >
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
            <h1 className="grid-item header-item rounded-br-[50px] font-numbers font-extrabold tracking-[4px]">
              PLAN
            </h1>
            {/* <h1 className="grid-item header-item-last">%</h1> */}
          </div>
          {isLoading && initialLoad ? (
            <ActivityIndicator />
          ) : (
            <>
              <div className="contents">
                <h2 className="grid-item font-numbers text-5xl font-extrabold text-amNeutral900 [text-orientation:upright] [writing-mode:vertical-lr]">
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
              <h2 className="grid-item font-numbers text-5xl font-extrabold text-amNeutral900 [text-orientation:upright] [writing-mode:vertical-lr]">
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
              <div className="absolute bottom-2 right-12">
                <LiveTimeCounter />
              </div>
            </>
          )}
        </main>
      ) : (
        <main className="main min-h-[100dvh] min-w-[100dvw] overflow-hidden rounded-[30px] bg-amNeutral100">
          <header className="flex h-[100px] w-full justify-between rounded-[30px] bg-amPrimary">
            <div className="group flex w-[150px] cursor-pointer items-center justify-center rounded-bl-[50px] transition-all duration-300 ease-in">
              <img
                src={logo}
                alt="logo"
                onClick={toggleMenu}
                className="group-hover:filter-iconHover w-[40%] transition-all duration-200 ease-in group-hover:scale-110"
              />
            </div>
            <h1 className="place-self-center self-center text-5xl font-extrabold text-white 2xl:text-[5.5rem]">
              {line}
            </h1>
            <div className="flex w-[150px] items-center pr-10 text-white">
              <LiveDateTime />
            </div>
          </header>
          <div className="h-full w-full">
            {isLoading && initialLoad ? (
              <div className="absolute top-1/2 mx-auto w-full">
                <ActivityIndicator />
              </div>
            ) : (
              <>
                <div className="my-12 grid w-full grid-cols-[1fr]">
                  <div className="flex min-h-[300px] flex-col items-center justify-center">
                    <div className=" absolute left-10 mx-auto text-center text-3xl font-extrabold text-amNeutral900 [text-orientation:upright] [writing-mode:vertical-lr] ">
                      DAN
                    </div>
                    <div className="flex h-full flex-col justify-center gap-2">
                      <h2 className="text-center text-2xl font-bold sm:text-3xl">
                        REALIZIRANO
                      </h2>
                      <div
                        className="text-center text-6xl font-extrabold sm:text-7xl"
                        style={{ color: numberColor(dayDone, dayPlan) }}
                      >
                        <AnimateNumber value={dayDone} />
                      </div>
                    </div>
                    <div className="flex h-full flex-col justify-center gap-2">
                      <h2 className="text-center text-2xl font-bold sm:text-3xl">
                        PLAN
                      </h2>
                      <p className="text-center text-6xl font-extrabold sm:text-7xl">
                        {dayPlan}/{dayPlanEnd}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-12 grid grid-cols-[1fr]">
                  <div className="flex min-h-[300px] flex-col items-center justify-center">
                    <div className="absolute left-10 mx-auto text-center text-3xl font-extrabold text-amNeutral900 [text-orientation:upright] [writing-mode:vertical-lr] ">
                      MESEC
                    </div>
                    <div className="flex h-full flex-col justify-center gap-2">
                      <h2 className="text-center text-2xl font-bold sm:text-3xl">
                        REALIZIRANO
                      </h2>
                      <div
                        className="text-center text-6xl font-extrabold sm:text-7xl"
                        style={{ color: numberColor(monthDone, monthPlan) }}
                      >
                        <AnimateNumber value={monthDone} />
                      </div>
                    </div>
                    <div className="flex h-full flex-col justify-center gap-2">
                      <h2 className="text-center text-2xl font-bold sm:text-3xl">
                        PLAN
                      </h2>
                      <p className="text-center text-6xl font-extrabold sm:text-7xl">
                        {monthPlan}/{monthPlanCurrent}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      )}

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
  line: PropTypes.string.isRequired,
};

export default SumCounter;
