import React, { useState, useEffect } from "react";
import "./animateNumber.css";

const AnimateNumber = ({ value }) => {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    setPrevValue(value);
  }, [value]);

  return (
    <div
      className={
        value > prevValue ? "number-animation-down" : "number-animation-up"
      }
    >
      {value}
    </div>
  );
};

export default AnimateNumber;
