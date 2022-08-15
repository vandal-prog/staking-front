import React, { useContext, useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
// import { useTicker } from "../../../hooks/useTicker";
import { getRemainingTimeUntilMsTimestamp } from "../../../utils/countdownTimer";

import { TransactionContext } from "../../../context/TransactionContext";
import { useTicker } from "../../../hooks/useTicker";

const Timer = (staked, user) => {
  //   let { futureDate } = useContext(TransactionContext);

  //   const { days, hours, minutes, seconds } = remainingTime;
  //   const updateRemainingTime = (hourTimestamp) => {
  //     return setRemainingTime(getRemainingTimeUntilMsTimestamp(hourTimestamp));
  //   };
  //   updateRemainingTime();

  //   remainingTime = useTicker(futureDate);
  // const settingsInfo = useContext(TransactionContext);

  const [workMinutes, setWorkMinutes] = useState(60);
  const [breakMinutes, setBreakMinutes] = useState(60);

  // const { isPaused, setIsPaused } = settingsInfo;
  // const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  // const isPausedRef = useRef(staked);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work" ? workMinutes : breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (staked.staked === false) {
        console.log(staked);
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [staked]);

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return <div>{`${"00"}:${"00"}:${minutes}:${seconds}`}</div>;
};

const mapStateToProps = (state) => ({
  user: state.user,
  staked: state.user.staked,
});

export default connect(mapStateToProps)(Timer);
