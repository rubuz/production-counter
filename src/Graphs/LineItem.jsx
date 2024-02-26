import PropTypes from "prop-types";

const LineItem = ({
  line,
  selectedLine,
  onLineClick,
  color,
  name,
  procent,
}) => {
  return (
    <li
      className={`flex cursor-pointer items-center justify-between pb-4 transition-all duration-200 ease-in-out hover:translate-x-2 ${selectedLine != null && selectedLine != line ? "opacity-35 grayscale" : ""}`}
      // onClick={() => onLineClick(line)}
      onMouseEnter={() => onLineClick(line)}
      onMouseLeave={() => onLineClick(null)}
    >
      <div className="flex items-center justify-start gap-4">
        <div className={`dot h-8 w-8 rounded-full bg-[${color}]`}></div>
        <div>
          <span className="font-semibold">{line}</span> {name}
        </div>
      </div>
      <div className="font-semibold">{procent}%</div>
    </li>
  );
};

LineItem.defaultProps = {
  selectedLine: 0,
};

LineItem.propTypes = {
  line: PropTypes.number.isRequired,
  selectedLine: PropTypes.number,
  onLineClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  procent: PropTypes.number.isRequired,
};

export default LineItem;
