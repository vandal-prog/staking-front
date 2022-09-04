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

const Timerzilla3 = ({ localstorage }) => {
  const [Items, setStateItems] = useState();
  const [DayTime, setDayTime] = useState();
  const [HourTime, setHourTime] = useState();
  const [MinuteTime, setMinuteTime] = useState();
  const [SecondsTime, setSecondsTime] = useState();
  const [change, setchange] = useState(false);

  const getItem = () => {
    const items = JSON.parse(localStorage.getItem(localstorage));
    console.log(items);
    setStateItems(items);
    console.log(Items);

    if (!items) {
      localStorage.setItem(
        localstorage,
        JSON.stringify({ running: false, value: 0 })
      );

      const items = JSON.parse(localStorage.getItem(localstorage));
      setStateItems(items);
      console.log(items);
      console.log(Items);
    }
  };

  const timeStampsFunction = () => {
    if (Items) {
      const timestamp = Items.running ? Date.now() + Items.value : Items.value;

      const dayy = Math.floor(timestamp / 86400000);
      const hourr = Math.floor(timestamp / 3600000) % 24;
      const minn = Math.floor(timestamp / 60000) % 60;
      const secc = Math.floor(timestamp / 1000) % 60;
      const ms = timestamp % 1000;

      console.log(dayy, hourr, minn, secc);
      setDayTime(dayy);
      setHourTime(hourr);
      setMinuteTime(minn);
      setSecondsTime(secc);
      console.log(
        DayTime + " " + HourTime + " " + MinuteTime + " " + SecondsTime
      );

      setTimeout(() => {
        setchange(!change);
      }, 1000);

      // return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    getItem();
    // timeStampsFunction()
    setchange(!change);
  }, []);

  useEffect(() => {
    timeStampsFunction();
    console.log(`My chest`);
  }, [change]);

  console.log(DayTime);

  return (
    // <div>{_(d) + ":" + _(h) + ":" + _(m) + ":" + _(s)}</div>

    <div>
      {" "}
      {DayTime ?? ""} : {HourTime ? HourTime : ""} :{" "}
      {MinuteTime ? MinuteTime : ""} : {SecondsTime ? SecondsTime : ""}{" "}
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Timerzilla3);
