import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./graphs.css";
import PropTypes from "prop-types";

const GraphDaily = (props) => {
  return (
    <div className="w-[80%]">
      <CircularProgressbarWithChildren
        value={props.line62100}
        strokeWidth={5}
        styles={buildStyles({
          pathColor: `${props.line62100path}`,
          trailColor: `${props.line62100bg}`,
        })}
      >
        <div className="w-[89.2%]">
          <CircularProgressbarWithChildren
            value={props.line62200}
            strokeWidth={5.6}
            styles={buildStyles({
              pathColor: `${props.line62200path}`,
              trailColor: `${props.line62200bg}`,
            })}
          >
            <div className="w-[87.9%]">
              <CircularProgressbarWithChildren
                value={props.line63000}
                strokeWidth={6.5}
                styles={buildStyles({
                  pathColor: `${props.line63000path}`,
                  trailColor: `${props.line63000bg}`,
                })}
              >
                <div className="w-[86.1%]">
                  <CircularProgressbarWithChildren
                    value={props.line63200}
                    strokeWidth={7.3}
                    styles={buildStyles({
                      pathColor: `${props.line63200path}`,
                      trailColor: `${props.line63200bg}`,
                    })}
                  >
                    <div className="w-[84.2%]">
                      <CircularProgressbarWithChildren
                        value={props.line65200}
                        strokeWidth={8.5}
                        styles={buildStyles({
                          pathColor: `${props.line65200path}`,
                          trailColor: `${props.line65200bg}`,
                        })}
                      >
                        <div className="w-[81.8%]">
                          <CircularProgressbar
                            value={props.line65300}
                            strokeWidth={10.7}
                            styles={buildStyles({
                              pathColor: `${props.line65300path}`,
                              trailColor: `${props.line65300bg}`,
                            })}
                          />
                        </div>
                        <div className="test">
                          <div>Realizirano: 23</div>
                          <div>Plan trenutni: 177</div>
                          <div>Plan končni: 454</div>
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
};

export default GraphDaily;
