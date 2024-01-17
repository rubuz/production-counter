import PropTypes from "prop-types";
import "./progress.css";

const Progress = (props) => {
  const procentageCalc = (done, plan) => {
    if (plan === 0) {
      return 0;
    } else {
      return Math.round((done / plan) * 100);
    }
  };

  const progressBar = -100 + procentageCalc(props.done, props.plan);

  // const procentage = Math.round((props.done / props.plan) * 100);
  // const progressBar = -100 + procentage;

  const getColor = () => {
    if (procentageCalc(props.done, props.plan) < 50) {
      return "#d20000";
    } else if (procentageCalc(props.done, props.plan) < 99) {
      return "#ffa500";
    } else {
      return "#2ecc71";
    }
  };

  return (
    <div className="border-[rgba(90, 90, 90, 0.2)] flex h-full w-full justify-center rounded-br-[50px] border-b-2 align-middle">
      <div className=" bg-amNeutral700 border-[rgba(90, 90, 90, 0.1)] relative flex h-[100px] w-[90%] justify-end overflow-hidden rounded-full border-[1px] align-middle shadow">
        <div
          className="absolute left-0 top-0 flex h-full w-full translate-x-[75%] items-center justify-end rounded-full bg-[#2ecc71] text-[2rem] font-bold transition-all duration-500 ease-in-out"
          style={
            procentageCalc(props.done, props.plan) > 100
              ? { transform: "translateX(0)", backgroundColor: "#2ecc71" }
              : {
                  transform: `translateX(${progressBar}%)`,
                  backgroundColor: getColor(),
                }
          }
        ></div>
        <span className="text-amText z-10 mr-4 text-5xl font-bold">
          {isNaN(procentageCalc(props.done, props.plan))
            ? 0
            : procentageCalc(props.done, props.plan)}
        </span>
      </div>
    </div>
  );
};

Progress.PropTypes = {
  done: PropTypes.number.isRequired,
  plan: PropTypes.number.isRequired,
};

export default Progress;
