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
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={
            procentageCalc(props.done, props.plan) > 100
              ? { transform: "translateX(0)", backgroundColor: "#2ecc71" }
              : {
                  transform: `translateX(${progressBar}%)`,
                  backgroundColor: getColor(),
                }
          }
        ></div>
        <span className="progress-procentage">
          {isNaN(procentageCalc(props.done, props.plan))
            ? 0
            : procentageCalc(props.done, props.plan)}
        </span>
      </div>
    </div>
  );
};

export default Progress;
