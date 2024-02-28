import "./counter.css";
// import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";
import SideMenu from "./SideMenu";
import { useIdle } from "react-use";
import PropTypes from "prop-types";
import LiveTimeCounter from "./LiveTimeCounter";
import { useMediaQuery } from "react-responsive";
import ActivityIndicator from "./ActivityIndicator";
import LiveDateTime from "./Graphs/LiveTime";

const Counter = ({ line, logo }) => {
  const url = `https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/${line}`;
  const token = import.meta.env.VITE_API_TOKEN;
  const [data, setData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isIdle = useIdle(5000);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Responsive displays
  const isBigScreen = useMediaQuery({ query: "(min-width: 1280px)" });

  const fetchData = () => {
    setIsLoading(true);
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
      })
      .finally(() => {
        setIsLoading(false);
        if (initialLoad) {
          setInitialLoad(false);
        }
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
  const dayDone = data.length > 0 ? data[0].proizvedeno || 0 : 0;
  const monthPlan = data.length > 1 ? data[1].planirano || 0 : 0;
  const monthPlanCurrent =
    data.length > 1 ? data[1].planirano_konec_dneva || 0 : 0;
  const monthDone = data.length > 1 ? data[1].proizvedeno || 0 : 0;

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

  // Hide cursor and prevent PC to go to sleep
  useEffect(() => {
    if (isIdle) {
      document.body.style.cursor = "none";
    } else if (!isIdle) {
      document.body.style.cursor = "default";
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        if ("wakeLock" in navigator) {
          navigator.wakeLock.request("screen");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange());

    return () => {
      document.addEventListener("visibilitychange", handleVisibilityChange());
    };
  }, [isIdle]);

  return (
    <div
      className={`app ${isMenuOpen ? "menu-open" : ""}`}
      onClick={toggleMenuIfOpen}
    >
      {/* <button onClick={handleDayIncrement}>TEST</button> */}
      {isBigScreen ? (
        <main
          className={`main min-h-[100dvh] min-w-[100dvw] ${isLoading && initialLoad ? "grid-rows-[200px_auto]" : "grid-rows-[200px_auto_auto]"} grid grid-cols-[150px_1fr_1fr] items-center justify-items-center overflow-hidden rounded-[50px] bg-amNeutral100`}
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
                  className="grid-item number-counter px-8 font-extrabold"
                  style={{ color: numberColor(dayDone, dayPlan) }}
                >
                  <AnimateNumber value={dayDone} />
                </div>
                <p className="grid-item number-counter-2 px-8 font-extrabold">
                  {dayPlan}/{dayPlanEnd}
                </p>
                {/* <Progress className="progress" done={dayDone} plan={dayPlan} /> */}
              </div>
              <h2 className="grid-item font-numbers text-5xl font-extrabold text-amNeutral900 [text-orientation:upright] [writing-mode:vertical-lr] ">
                MESEC
              </h2>
              <div
                className="grid-item number-counter px-8 font-extrabold"
                style={{ color: numberColor(monthDone, monthPlan) }}
              >
                <AnimateNumber value={monthDone} />
              </div>
              <p className="grid-item number-counter-2 px-8 font-extrabold">
                {monthPlan}/{monthPlanCurrent}
              </p>
              {/* <Progress className="progress" done={monthDone} plan={monthPlan} /> */}{" "}
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
                className="group-hover:filter-iconHover w-[50%] transition-all duration-200 ease-in group-hover:scale-110"
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

Counter.propTypes = {
  line: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
};

export default Counter;
