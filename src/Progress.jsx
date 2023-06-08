import React, { useState } from "react";
import "./progress.css";

const Progress = (props) => {
  const [progress, setProgress] = useState(0);

  const procentage = Math.round((props.done / props.plan) * 100);
  const progressBar = -100 + procentage;

  const getColor = () => {
    if (procentage < 30) {
      return "#d20000";
    } else if (procentage < 80) {
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
          style={{
            transform: `translateX(${progressBar}%)`,
            backgroundColor: getColor(),
          }}
        ></div>
        <span className="progress-procentage">{procentage}</span>
      </div>
    </div>
  );
};

export default Progress;
