import { useState, useEffect } from "react";

function LiveTimeCounter() {
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
    <div className="flex items-center justify-center gap-4">
      <h1 className="text-xl  tracking-[4px]">
        {currentDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </h1>
      <h1 className="text-xl font-extrabold tracking-[4px]">
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

export default LiveTimeCounter;
