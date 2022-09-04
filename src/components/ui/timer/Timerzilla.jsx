import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  selectDays,
  selectHours,
  selectMinutes,
  selectSeconds,
} from "../../../redux/user/time-selectors";
import {
  setDayTime,
  setHourTime,
  setMinuteTime,
  setSecondsTime,
} from "../../../redux/user/user.actions";

const Timerzilla = ({
  localstorage,
  staked,
  d,
  h,
  m,
  s,
  setDayTime,
  setHourTime,
  setMinuteTime,
  setSecondsTime,
}) => {
  const [timeState, setTimeState] = useState({});
  const [timeStamp, setTimestamp] = useState(0);

  function saveChanges(state) {
    console.log("saveChanges", localstorage, state);
    if (localstorage) {
      localStorage.setItem(localstorage, JSON.stringify(state));
    }
    return state;
  }

  const startTimer = ({ running, value }) => {
    const now = Date.now();
    if (!running) return null;

    const newTimeState = saveChanges({
      running: true,
      value: value - now,
    });

    console.log();

    setTimeState(newTimeState);
  };
  const stopTimer = () => {
    const now = Date.now();

    if (!timeState.running) return null;

    const newTimeState = saveChanges({
      running: false,
      value: timeState.value + now,
    });

    setTimeState(newTimeState);
  };

  const resetTimer = () => {
    const now = Date.now();

    const newTimeState = saveChanges({
      running: false,
      value: 0,
    });

    setTimeState(newTimeState);

    //just reset the timer to 0, don' stop it
    //return this.saveChanges({
    //  running,
    //  value: running? -now: 0
    //});
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      const timeState = JSON.parse(localStorage.getItem(localstorage));

      if (!timeState) {
        const newState = saveChanges({
          running: false,
          value: 0,
        });

        setTimeState(newState);
      } else {
        setTimeState(timeState);
      }

      console.log(timeState);
      console.log(timeState.value);
      console.log(localStorage);

      let timestamp = timeState.running
        ? Date.now() + timeState.value
        : timeState.value;

      // console.log(timeState);
      setTimestamp(timestamp);

      console.log(timestamp);
      let day = Math.floor(timestamp / 86400000);
      let hour = Math.floor(timestamp / 3600000) % 24;
      let min = Math.floor(timestamp / 60000) % 60;
      let sec = Math.floor(timestamp / 1000) % 60;
      let ms = timestamp % 1000;

      setDayTime(day);
      setHourTime(hour);
      setMinuteTime(min);
      setSecondsTime(sec);
    }, 1000);
    return () => clearInterval(timeInterval);

    // if (staked) {
    //   console.log(`I love jesus`);
    // }

    // const timeInterval = setInterval(() => {}, 1000);
    // return () => clearInterval(timeInterval);
  }, [timeStamp]);

  if (staked) {
    startTimer(timeState);
  }
  const _ = (nr, length = 2, padding = 0) =>
    String(nr).padStart(length, padding);

  return <div>{_(d) + ":" + _(h) + ":" + _(m) + ":" + _(s)}</div>;
};

const mapStateToProps = (state) => ({
  d: selectDays(state),
  h: selectHours(state),
  m: selectMinutes(state),
  s: selectSeconds(state),
});

const mapDispatchToProps = (dispatch) => ({
  // hasStaked: () => dispatch(hasStaked()),
  // setHourlyIncome: () => dispatch(setHourlyIncome()),
  // setAccountBalance: (balance) => dispatch(setAccountBalance(balance)),
  // setTodayIncome: (hourlyIncome) => dispatch(setTodayIncome(hourlyIncome)),
  // setCumulativeIncome: (hourlyIncome) =>
  //   dispatch(setCumulativeIncome(hourlyIncome)),
  // setRate: (percent) => dispatch(setRate(percent)),
  // setOnChainBalance: () => dispatch(setOnChainBalance()),
  // setStakeRecords: (record) => dispatch(setStakeRecords(record)),
  setDayTime: (day) => dispatch(setDayTime(day)),
  setHourTime: (hour) => dispatch(setHourTime(hour)),
  setMinuteTime: (minute) => dispatch(setMinuteTime(minute)),
  setSecondsTime: (second) => dispatch(setSecondsTime(second)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timerzilla);
