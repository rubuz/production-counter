import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GraphDaily = (props) => {
  return (
    <div style={{ width: "80%" }}>
      <CircularProgressbarWithChildren
        value={props.line62100}
        strokeWidth={5}
        styles={buildStyles({ pathColor: "#D20000", trailColor: "#eee" })}
      >
        <div style={{ width: "89.2%" }}>
          <CircularProgressbarWithChildren
            value={props.line62200}
            strokeWidth={5.6}
            styles={buildStyles({ pathColor: "#FF9505", trailColor: "#eee" })}
          >
            <div style={{ width: "87.9%" }}>
              <CircularProgressbarWithChildren
                value={props.line63000}
                strokeWidth={6.5}
                styles={buildStyles({
                  pathColor: "#FFB627",
                  trailColor: "#eee",
                })}
              >
                <div style={{ width: "86.1%" }}>
                  <CircularProgressbarWithChildren
                    value={props.line63200}
                    strokeWidth={7.3}
                    styles={buildStyles({
                      pathColor: "#FFC971",
                      trailColor: "#eee",
                    })}
                  >
                    <div style={{ width: "84.2%" }}>
                      <CircularProgressbarWithChildren
                        value={props.line65200}
                        strokeWidth={8.5}
                        styles={buildStyles({
                          pathColor: "#0FA3B1",
                          trailColor: "#eee",
                        })}
                      >
                        <div style={{ width: "81.8%" }}>
                          <CircularProgressbar
                            value={props.line65300}
                            strokeWidth={10.7}
                            styles={buildStyles({
                              pathColor: "#002d5f",
                              trailColor: "#eee",
                            })}
                          />
                        </div>
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

export default GraphDaily;

{
  /*  */
}
