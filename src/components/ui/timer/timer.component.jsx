import React, { useContext } from "react";
// import { useTicker } from "../../../hooks/useTicker";
import { getRemainingTimeUntilMsTimestamp } from "../../../utils/countdownTimer";

import { TransactionContext } from "../../../context/TransactionContext";

const Timer = ({ days, hours, minutes, seconds }) => {
  //   let { futureDate } = useContext(TransactionContext);
  let { setRemainingTime } = useContext(TransactionContext);
  //   const { days, hours, minutes, seconds } = remainingTime;
  //   const updateRemainingTime = (hourTimestamp) => {
  //     return setRemainingTime(getRemainingTimeUntilMsTimestamp(hourTimestamp));
  //   };
  //   updateRemainingTime();

  //   remainingTime = useTicker(futureDate);
  return <div>{`${days}:${hours}:${minutes}:${seconds}`}</div>;
};

export default Timer;
