import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./graphs.css";

const GraphDaily = (props) => {
  return (
    <div style={{ width: "80%" }}>
      <CircularProgressbarWithChildren
        value={props.line62100}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: `${props.line62100path}`,
          trailColor: `${props.line62100bg}`,
        })}
      >
        <div style={{ width: "89.2%" }}>
          <CircularProgressbarWithChildren
            value={props.line62200}
            strokeWidth={5.6}
            styles={buildStyles({
              pathColor: `${props.line62200path}`,
              trailColor: `${props.line62200bg}`,
            })}
          >
            <div style={{ width: "87.9%" }}>
              <CircularProgressbarWithChildren
                value={props.line63000}
                strokeWidth={6.5}
                styles={buildStyles({
                  pathColor: `${props.line63000path}`,
                  trailColor: `${props.line63000bg}`,
                })}
              >
                <div style={{ width: "86.1%" }}>
                  <CircularProgressbarWithChildren
                    value={props.line63200}
                    strokeWidth={7.3}
                    styles={buildStyles({
                      pathColor: `${props.line63200path}`,
                      trailColor: `${props.line63200bg}`,
                    })}
                  >
                    <div style={{ width: "84.2%" }}>
                      <CircularProgressbarWithChildren
                        value={props.line65200}
                        strokeWidth={8.5}
                        styles={buildStyles({
                          pathColor: `${props.line65200path}`,
                          trailColor: `${props.line65200bg}`,
                        })}
                      >
                        <div style={{ width: "81.8%" }}>
                          <CircularProgressbar
                            value={props.line65300}
                            strokeWidth={10.7}
                            styles={buildStyles({
                              pathColor: `${props.line65300path}`,
                              trailColor: `${props.line65300bg}`,
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
