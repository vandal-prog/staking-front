import React, { useContext, useEffect, useState, useRef } from "react";
// import { useTicker } from "../../../hooks/useTicker";
import { getRemainingTimeUntilMsTimestamp } from "../../../utils/countdownTimer";

import { TransactionContext } from "../../../context/TransactionContext";
import { useTicker } from "../../../hooks/useTicker";

const Timer = () => {
  //   let { futureDate } = useContext(TransactionContext);

  //   const { days, hours, minutes, seconds } = remainingTime;
  //   const updateRemainingTime = (hourTimestamp) => {
  //     return setRemainingTime(getRemainingTimeUntilMsTimestamp(hourTimestamp));
  //   };
  //   updateRemainingTime();

  //   remainingTime = useTicker(futureDate);
  const settingsInfo = useContext(TransactionContext);

  const { isPaused, setIsPaused } = settingsInfo;
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        console.log(isPaused);
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return <div>{`${"00"}:${"00"}:${minutes}:${seconds}`}</div>;
};

export default Timer;
