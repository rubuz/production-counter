import { useState, useEffect } from "react";
import "./graphs.css";

function LiveDateTime() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="live-time">
      <h1>{currentDate.toLocaleDateString()}</h1>
      <h1>
        {currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })}
      </h1>
    </div>
  );
}

export default LiveDateTime;
