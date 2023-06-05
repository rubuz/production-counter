import React from "react";
import "./progress.css";

const Progress = () => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress-bar-fill"></div>
        <span className="progress-procentage">45</span>
      </div>
    </div>
  );
};

export default Progress;
