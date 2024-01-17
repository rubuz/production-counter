import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

AnimateNumber.propTypes = {
  value: PropTypes.number.isRequired,
};

export default AnimateNumber;
