import "./counter.css";
// import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";
import SideMenu from "./SideMenu";
import PropTypes from "prop-types";
import LiveTimeCounter from "./LiveTimeCounter";

const SumCounter = ({ logo }) => {
  const productionLineIds = [62100, 62200, 63000, 63200, 65200, 65300]; // Add all production line IDs here
  const [totalData, setTotalData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

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
          <div className="col-span-3 text-center">
            <div
              role="status"
              className="flex items-center justify-center gap-6"
            >
              <svg
                aria-hidden="true"
                className="inline h-16 w-16 animate-spin fill-amAccent text-gray-200"
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
