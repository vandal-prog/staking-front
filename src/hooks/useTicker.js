import { useEffect, useState } from "react";
import { intervalToDuration, isBefore } from "date-fns";

export const useTicker = (futureDate) => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [futureDate]);

  const isTimeUp = isBefore(futureDate, now);

  if (isTimeUp) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp };
  }

  let { days, hours, minutes, seconds } = intervalToDuration({
    start: now,
    end: futureDate,
  });

  function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if (numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString;
  }

  return {
    days: padWithZeros(days, 2),
    hours: padWithZeros(hours, 2),
    minutes: padWithZeros(minutes, 2),
    seconds: padWithZeros(seconds, 2),
    isTimeUp,
  };
};

//now 1659697462
//future 1659657862
