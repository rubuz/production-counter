import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GraphMonthly = (props) => {
  return (
    <div style={{ width: "80%" }}>
      <CircularProgressbarWithChildren value={props.line62100} strokeWidth={5}>
        <div style={{ width: "89.2%" }}>
          <CircularProgressbarWithChildren
            value={props.line62200}
            strokeWidth={5.6}
          >
            <div style={{ width: "87.9%" }}>
              <CircularProgressbarWithChildren
                value={props.line63000}
                strokeWidth={6.5}
              >
                <div style={{ width: "86.1%" }}>
                  <CircularProgressbarWithChildren
                    value={props.line63200}
                    strokeWidth={7.3}
                  >
                    <div style={{ width: "84.2%" }}>
                      <CircularProgressbarWithChildren
                        value={props.line65200}
                        strokeWidth={8.5}
                      >
                        <div style={{ width: "81.8%" }}>
                          <CircularProgressbar
                            value={props.line65300}
                            strokeWidth={10.7}
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

export default GraphMonthly;
