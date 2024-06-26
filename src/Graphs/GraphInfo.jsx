import PropTypes from "prop-types";
import LineItem from "./LineItem";

const GraphInfo = (props) => {
  const lines = [
    { line: 62100, name: "Prikolice 1", color: "#ff5733" },
    { line: 62200, name: "Astela & Alpina", color: "#ffc300" },
    { line: 63000, name: "Avtodomi", color: "#abc480" },
    { line: 63200, name: "Sonic & Coral Supreme", color: "#c70039" },
    { line: 65200, name: "Van Bič", color: "#3395ff" },
    { line: 65300, name: "Active Bič", color: "#f70077" },
  ];

  return (
    <div className="mx-auto h-[80%] font-numbers text-2xl 2xl:w-[80%] 2xl:text-3xl">
      <ul className="mx-auto flex h-full flex-col justify-around max-2xl:max-w-[800px] max-2xl:gap-4">
        {/* <li
          className={`flex cursor-pointer items-center justify-between pb-4 transition-all duration-200 ease-in-out hover:translate-x-2 ${props.selectedLine != null && props.selectedLine != 62100 ? "opacity-35 grayscale" : ""}`}
          onClick={() => props.onLineClick(62100)}
        >
          <div className="flex items-center justify-start gap-4">
            <div className="dot1 h-8 w-8 rounded-full bg-[#ff5733]"></div>
            <div>
              <span className="font-semibold">62100</span> Prikolice 1
            </div>
          </div>
          <div>{props.line62100}%</div>
        </li>
        <li
          className={`flex cursor-pointer items-center justify-between pb-4 transition-all duration-200 ease-in-out hover:translate-x-2 ${props.selectedLine != null && props.selectedLine != 62200 ? "opacity-35 grayscale" : ""}`}
          onClick={() => props.onLineClick(62200)}
        >
          <div className="flex items-center justify-start gap-4">
            <div className="dot2 h-8 w-8 rounded-full bg-[#ffc300]"></div>
            <div>
              <span className="font-semibold">62200</span> Astela & Alpina
            </div>
          </div>
          <div>{props.line62200}%</div>
        </li>
        <li
          className={`flex cursor-pointer items-center justify-between pb-4 transition-all duration-200 ease-in-out hover:translate-x-2 ${props.selectedLine != null && props.selectedLine != 63000 ? "opacity-35 grayscale" : ""}`}
          onClick={() => props.onLineClick(63000)}
        >
          <div className="flex items-center justify-start gap-4">
            <div className="dot3 h-8 w-8 rounded-full bg-[#abc480]"></div>
            <div>
              <span className="font-semibold">63000</span> Avtodomi
            </div>
          </div>
          <div>{props.line63000}%</div>
        </li>
        <li
          className={`flex cursor-pointer items-center justify-between pb-4 transition-all duration-200 ease-in-out hover:translate-x-2 ${props.selectedLine != null && props.selectedLine != 63200 ? "opacity-35 grayscale" : ""}`}
          onClick={() => props.onLineClick(63200)}
        >
          <div className="flex items-center justify-start gap-4">
            <div className="dot4 h-8 w-8 rounded-full bg-[#c70039]"></div>
            <div>
              <span className="font-semibold">63200</span> Sonic & Coral Supreme
            </div>
          </div>
          <div>{props.line63200}%</div>
        </li>
        <li
          className={`flex cursor-pointer items-center justify-between pb-4 transition-all duration-200 ease-in-out hover:translate-x-2 ${props.selectedLine != null && props.selectedLine != 65200 ? "opacity-35 grayscale" : ""}`}
          onClick={() => props.onLineClick(65200)}
        >
          <div className="flex items-center justify-start gap-4">
            <div className="dot5 h-8 w-8 rounded-full bg-[#3395ff]"></div>
            <div>
              <span className="font-semibold">65200</span> Van Bič
            </div>
          </div>
          <div>{props.line65200}%</div>
        </li>
        <li
          className={`flex cursor-pointer items-center justify-between pb-4 transition-all duration-200 ease-in-out hover:translate-x-2 ${props.selectedLine != null && props.selectedLine != 65300 ? "opacity-35 grayscale" : ""}`}
          onClick={() => props.onLineClick(65300)}
        >
          <div className="flex items-center justify-start gap-4">
            <div className="dot6 h-8 w-8 rounded-full bg-[#f70077]"></div>
            <div>
              <span className="font-semibold">65300</span> Active Bič
            </div>
          </div>
          <div>{props.line65300}%</div>
        </li> */}
        {lines.map((line) => (
          <LineItem
            key={line.line}
            line={line.line}
            selectedLine={props.selectedLine}
            onLineClick={props.onLineClick}
            color={line.color}
            name={line.name}
            procent={props[`line${line.line}`]}
          />
        ))}
      </ul>
    </div>
  );
};

GraphInfo.propTypes = {
  line62100: PropTypes.number.isRequired,
  line62200: PropTypes.number.isRequired,
  line63000: PropTypes.number.isRequired,
  line63200: PropTypes.number.isRequired,
  line65200: PropTypes.number.isRequired,
  line65300: PropTypes.number.isRequired,
  selectedLine: PropTypes.number,
  onLineClick: PropTypes.func.isRequired,
};

export default GraphInfo;
