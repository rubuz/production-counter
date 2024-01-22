import "./counter.css";
// import Progress from "./Progress";
import { useEffect, useState } from "react";
import AnimateNumber from "./AnimateNumber";
import SideMenu from "./SideMenu";
import { useIdle } from "react-use";
import PropTypes from "prop-types";

const Counter = ({ line, logo }) => {
  const url = `https://iws.adria-mobil.si/ProizvodnjaWCFService/ProizvodnjaWCFService.svc/GetData/${line}`;
  const token =
    "Basic UHJvaXp2b2RuamFXQ0ZTZWN1cmVVc2VyOjl1aFk4dm1kc1Z5WnRIQ0g4ZDVh";
  const [data, setData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isIdle = useIdle(5000);

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
      <main className="main bg-amNeutral100 grid min-h-[100dvh] min-w-[100dvw] grid-cols-[150px_1fr_1fr] grid-rows-[200px_auto_auto] items-center justify-items-center overflow-hidden rounded-[50px]">
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
            className="grid-item px-8 text-[15rem] font-extrabold"
            style={{ color: numberColor(dayDone, dayPlan) }}
          >
            <AnimateNumber value={dayDone} />
          </div>
          <p className="grid-item px-8 text-[14rem] font-extrabold">
            {dayPlan}/{dayPlanEnd}
          </p>
          {/* <Progress className="progress" done={dayDone} plan={dayPlan} /> */}
        </div>
        <h2 className="grid-item font-numbers text-amNeutral900 text-5xl font-extrabold [text-orientation:upright] [writing-mode:vertical-lr] ">
          MESEC
        </h2>
        <div
          className="grid-item px-8 text-[15rem] font-extrabold"
          style={{ color: numberColor(monthDone, monthPlan) }}
        >
          <AnimateNumber value={monthDone} />
        </div>
        <p className="grid-item px-8 text-[14rem] font-extrabold">
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

Counter.propTypes = {
  line: PropTypes.number.isRequired,
  logo: PropTypes.string.isRequired,
};

export default Counter;
