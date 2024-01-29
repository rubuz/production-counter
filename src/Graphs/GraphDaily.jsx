import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PropTypes from "prop-types";
import { MdKeyboardArrowRight } from "react-icons/md";

const GraphDaily = (props) => {
  const lineDataProizvedeno = () => {
    if (props.selectedLine != undefined) {
      if (props.month) {
        return props.graphData[props.selectedLine][1].proizvedeno;
      } else {
        return props.graphData[props.selectedLine][0].proizvedeno;
      }
    } else {
      return false;
    }
  };

  const lineDataPlanTrenutni = () => {
    if (props.selectedLine != undefined) {
      if (props.month) {
        return props.graphData[props.selectedLine][1].planirano;
      } else {
        return props.graphData[props.selectedLine][0].planirano;
      }
    } else {
      return false;
    }
  };

  const lineDataPlanFinal = () => {
    if (props.selectedLine != undefined) {
      if (props.month) {
        return props.graphData[props.selectedLine][1].planirano_konec_dneva;
      } else {
        return props.graphData[props.selectedLine][0].planirano_konec_dneva;
      }
    } else {
      return false;
    }
  };

  // difference between plan and proizvedeno

  const diffPlan = (line) => {
    if (props.graphData[line]) {
      if (props.month) {
        return (
          props.graphData[line][1].proizvedeno -
          props.graphData[line][1].planirano
        );
      } else {
        return (
          props.graphData[line][0].proizvedeno -
          props.graphData[line][0].planirano
        );
      }
    } else {
      return 0;
    }
  };

  // if planirano_konec_dneva is 0, return true
  const planEndZero = (line) => {
    if (props.graphData[line]) {
      if (props.month) {
        if (props.graphData[line][1].planirano_konec_dneva === "0") {
          return true;
        } else {
          return false;
        }
      } else {
        if (props.graphData[line][0].planirano_konec_dneva === "0") {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  };

  return (
    <div className="w-[80%]">
      <CircularProgressbarWithChildren
        value={props.line62100}
        strokeWidth={5}
        styles={{
          path: { stroke: `${props.line62100path}` },
          trail: { stroke: `${props.line62100bg}` },
          root: {
            opacity: `${props.selectedLine != null && props.selectedLine != 62100 ? "15%" : "100%"}`,
            filter: `grayscale(${props.selectedLine != null && props.selectedLine != 62100 ? "100%" : "0%"})`,
            transition: "all 0.2s ease-in-out",
          },
        }}
      >
        <div
          className={`absolute top-1 ml-8 text-xl font-bold ${props.selectedLine != null && props.selectedLine != 62100 ? "opacity-15 grayscale-0" : "opacity-100 grayscale-0"} flex items-center transition-all duration-200 ${planEndZero(62100) ? "hidden" : ""}`}
        >
          <div className={`${planEndZero(62200) ? "opacity-100" : ""}`}>
            <span>{diffPlan(62100) > 0 ? "+" : ""}</span>
            <span>{diffPlan(62100)}</span>
          </div>
          <span>
            <MdKeyboardArrowRight
              className={`h-8 w-6 ${diffPlan(62100) === 0 ? "" : diffPlan(62100) > 0 ? "-rotate-90" : "rotate-90"} transition-all duration-200`}
            />
          </span>
        </div>
        <div className="w-[89.2%]">
          <CircularProgressbarWithChildren
            value={props.line62200}
            strokeWidth={5.6}
            styles={{
              path: { stroke: `${props.line62200path}` },
              trail: { stroke: `${props.line62200bg}` },
              root: {
                opacity: `${props.selectedLine != null && props.selectedLine != 62200 ? "15%" : "100%"}`,
                filter: `grayscale(${props.selectedLine != null && props.selectedLine != 62200 ? "100%" : "0%"})`,
                transition: "all 0.2s ease-in-out",
              },
            }}
          >
            <div
              className={`absolute top-1 ml-8 text-xl font-bold ${props.selectedLine != null && props.selectedLine != 62200 ? "opacity-15 grayscale-0" : "opacity-100 grayscale-0"} flex items-center transition-all duration-200 ${planEndZero(62200) ? "hidden" : ""}`}
            >
              <div className={`${planEndZero(62200) ? "opacity-100" : ""}`}>
                <span>{diffPlan(62200) > 0 ? "+" : ""}</span>
                <span>{diffPlan(62200)}</span>
              </div>
              <span>
                <MdKeyboardArrowRight
                  className={`h-8 w-6 ${diffPlan(62200) === 0 ? "" : diffPlan(62200) > 0 ? "-rotate-90" : "rotate-90"} transition-all duration-200`}
                />
              </span>
            </div>
            <div className="w-[87.9%]">
              <CircularProgressbarWithChildren
                value={props.line63000}
                strokeWidth={6.5}
                styles={{
                  path: { stroke: `${props.line63000path}` },
                  trail: { stroke: `${props.line63000bg}` },
                  root: {
                    opacity: `${props.selectedLine != null && props.selectedLine != 63000 ? "15%" : "100%"}`,
                    filter: `grayscale(${props.selectedLine != null && props.selectedLine != 63000 ? "100%" : "0%"})`,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                <div
                  className={`absolute top-1 ml-8 text-xl font-bold ${props.selectedLine != null && props.selectedLine != 63000 ? "opacity-15 grayscale-0" : "opacity-100 grayscale-0"} flex items-center transition-all duration-200 ${planEndZero(63000) ? "hidden" : ""}`}
                >
                  <div className={`${planEndZero(63000) ? "opacity-100" : ""}`}>
                    <span>{diffPlan(63000) > 0 ? "+" : ""}</span>
                    <span>{diffPlan(63000)}</span>
                  </div>
                  <span>
                    <MdKeyboardArrowRight
                      className={`h-8 w-6 ${diffPlan(63000) === 0 ? "" : diffPlan(63000) > 0 ? "-rotate-90" : "rotate-90"} transition-all duration-200`}
                    />
                  </span>
                </div>
                <div className="w-[86.1%]">
                  <CircularProgressbarWithChildren
                    value={props.line63200}
                    strokeWidth={7.3}
                    styles={{
                      path: { stroke: `${props.line63200path}` },
                      trail: { stroke: `${props.line63200bg}` },
                      root: {
                        opacity: `${props.selectedLine != null && props.selectedLine != 63200 ? "15%" : "100%"}`,
                        filter: `grayscale(${props.selectedLine != null && props.selectedLine != 63200 ? "100%" : "0%"})`,
                        transition: "all 0.2s ease-in-out",
                      },
                    }}
                  >
                    <div
                      className={`absolute top-1 ml-8 text-xl font-bold ${props.selectedLine != null && props.selectedLine != 63200 ? "opacity-15 grayscale-0" : "opacity-100 grayscale-0"} flex items-center transition-all duration-200 ${planEndZero(63200) ? "hidden" : ""}`}
                    >
                      <div
                        className={`${planEndZero(63200) ? "opacity-100" : ""}`}
                      >
                        <span>{diffPlan(63200) > 0 ? "+" : " "}</span>
                        <span>{diffPlan(63200)}</span>
                      </div>
                      <span>
                        <MdKeyboardArrowRight
                          className={`h-8 w-6 ${diffPlan(63200) === 0 ? "" : diffPlan(63200) > 0 ? "-rotate-90" : "rotate-90"} transition-all duration-200`}
                        />
                      </span>
                    </div>
                    <div className="w-[84.2%]">
                      <CircularProgressbarWithChildren
                        value={props.line65200}
                        strokeWidth={8.5}
                        styles={{
                          path: { stroke: `${props.line65200path}` },
                          trail: { stroke: `${props.line65200bg}` },
                          root: {
                            opacity: `${props.selectedLine != null && props.selectedLine != 65200 ? "15%" : "100%"}`,
                            filter: `grayscale(${props.selectedLine != null && props.selectedLine != 65200 ? "100%" : "0%"})`,
                            transition: "all 0.2s ease-in-out",
                          },
                        }}
                      >
                        <div
                          className={`absolute top-1 ml-8 text-xl font-bold ${props.selectedLine != null && props.selectedLine != 65200 ? "opacity-15 grayscale-0" : "opacity-100 grayscale-0"} flex items-center transition-all duration-200 ${planEndZero(65200) ? "hidden" : ""}`}
                        >
                          <div
                            className={`${planEndZero(65200) ? "opacity-100" : ""}`}
                          >
                            <span>{diffPlan(65200) > 0 ? "+" : ""}</span>
                            <span>{diffPlan(65200)}</span>
                          </div>
                          <span>
                            <MdKeyboardArrowRight
                              className={`h-8 w-6 ${diffPlan(65200) === 0 ? "" : diffPlan(65200) > 0 ? "-rotate-90" : "rotate-90"} transition-all duration-200`}
                            />
                          </span>
                        </div>
                        <div className="relative w-[81.8%]">
                          <CircularProgressbarWithChildren
                            value={props.line65300}
                            strokeWidth={10.7}
                            styles={{
                              path: { stroke: `${props.line65300path}` },
                              trail: { stroke: `${props.line65300bg}` },
                              root: {
                                opacity: `${props.selectedLine != null && props.selectedLine != 65300 ? "15%" : "100%"}`,
                                filter: `grayscale(${props.selectedLine != null && props.selectedLine != 65300 ? "100%" : "0%"})`,
                                transition: "all 0.2s ease-in-out",
                              },
                            }}
                          >
                            <div
                              className={`absolute top-1 ml-8 text-xl font-bold ${props.selectedLine != null && props.selectedLine != 65300 ? "opacity-15 grayscale-0" : "opacity-100 grayscale-0"} flex items-center transition-all duration-200 ${planEndZero(65300) ? "hidden" : ""}`}
                            >
                              <div
                                className={`${planEndZero(65300) ? "opacity-100" : ""}`}
                              >
                                <span>{diffPlan(65300) > 0 ? "+" : ""}</span>
                                <span>{diffPlan(65300)}</span>
                              </div>
                              <span>
                                <MdKeyboardArrowRight
                                  className={`h-8 w-6 ${diffPlan(65300) === 0 ? "" : diffPlan(65300) > 0 ? "-rotate-90" : "rotate-90"} transition-all duration-200`}
                                />
                              </span>
                            </div>
                          </CircularProgressbarWithChildren>
                        </div>
                        <div
                          className={`absolute text-2xl ${props.selectedLine != null ? "opacity-100" : "opacity-0"}`}
                        >
                          <p className="flex w-full justify-between gap-5">
                            Realizirano:{" "}
                            <span className="font-bold">
                              {lineDataProizvedeno()}
                            </span>
                          </p>
                          <p className="flex w-full justify-between gap-5">
                            Plan trenutni:{" "}
                            <span className="font-bold">
                              {lineDataPlanTrenutni()}
                            </span>
                          </p>
                          <p className="flex w-full justify-between gap-5">
                            Plan končni:{" "}
                            <span className="font-bold">
                              {lineDataPlanFinal()}
                            </span>
                          </p>
                        </div>{" "}
                      </CircularProgressbarWithChildren>
                    </div>
                  </CircularProgressbarWithChildren>
                </div>
              </CircularProgressbarWithChildren>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

GraphDaily.propTypes = {
  line62100: PropTypes.number.isRequired,
  line62200: PropTypes.number.isRequired,
  line63000: PropTypes.number.isRequired,
  line63200: PropTypes.number.isRequired,
  line65200: PropTypes.number.isRequired,
  line65300: PropTypes.number.isRequired,
  line62100path: PropTypes.string.isRequired,
  line62200path: PropTypes.string.isRequired,
  line63000path: PropTypes.string.isRequired,
  line63200path: PropTypes.string.isRequired,
  line65200path: PropTypes.string.isRequired,
  line65300path: PropTypes.string.isRequired,
  line62100bg: PropTypes.string.isRequired,
  line62200bg: PropTypes.string.isRequired,
  line63000bg: PropTypes.string.isRequired,
  line63200bg: PropTypes.string.isRequired,
  line65200bg: PropTypes.string.isRequired,
  line65300bg: PropTypes.string.isRequired,
  graphData: PropTypes.object.isRequired,
  selectedLine: PropTypes.number,
  month: PropTypes.bool.isRequired,
};

export default GraphDaily;
