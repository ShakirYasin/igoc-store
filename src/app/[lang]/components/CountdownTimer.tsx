"use client";
import { useState, useEffect } from "react";

let CountdownTimer = () => {
  let [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 0,
    minutes: 5,
    seconds: 0,
  });

  useEffect(() => {
    let timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime; // Stop at 00:00:00:00
        }

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-center font-bold text-[#474747] text-2xl py-1 uppercase">
        Tawaran masa terhad
      </h1>
      <div className="flex justify-center gap-2">
        {Object.values(timeLeft).map((time, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-[#d3d3d3] text-black font-bold text-3xl py-3 min-w-[65px] text-center">
              {String(time).padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
