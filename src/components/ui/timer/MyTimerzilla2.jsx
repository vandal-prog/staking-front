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

const Timerzilla3 = ({ localstorage, staked }) => {
  const [Items, setStateItems] = useState({ running: false, value: 0 });
  const [DayTime, setDayTime] = useState(0);
  const [HourTime, setHourTime] = useState(0);
  const [MinuteTime, setMinuteTime] = useState(0);
  const [SecondsTime, setSecondsTime] = useState(0);
  const [change, setchange] = useState(false);

  const something = (function () {
    let executed = false;
    return function () {
      if (!executed) {
        executed = true;
        // do something

        const now = Date.now();

        if (!Items.running) {
          var NewState = {
            running: true,
            value: 0 - now,
          };
          console.log(NewState);
          localStorage.setItem(localstorage, JSON.stringify(NewState));
          setStateItems(NewState);
        }
      }
    };
  })();

  const reset = (function () {
    let executed = false;
    return function () {
      if (!executed) {
        executed = true;
        // do something

        let NewState = {
          running: false,
          value: 0,
        };
        localStorage.setItem(localstorage, JSON.stringify(NewState));
        setStateItems(NewState);
      }
    };
  })();

  // const start = () => {
  //   if (Items.running) {
  //     // console.log("fbfuud", Items);
  //     return null;
  //   }
  //   const now = Date.now();

  //   if (!Items.running) {
  //     var NewState = {
  //       running: true,
  //       value: 0 - now,
  //     };
  //     localStorage.setItem(localstorage, JSON.stringify(NewState));
  //     setStateItems(NewState);
  //   }
  // };

  // const reset = () => {
  //   let NewState = {
  //     running: false,
  //     value: 0,
  //   };
  //   localStorage.setItem(localstorage, JSON.stringify(NewState));
  //   setStateItems(NewState);
  // };

  const getItem = async () => {
    const items = await JSON.parse(localStorage.getItem(localstorage));

    if (!items) {
      localStorage.setItem(
        localstorage,
        JSON.stringify({ running: false, value: 0 })
      );
      setStateItems({ running: false, value: 0 });
    }

    if (items) {
      console.log(items);
      setStateItems(items);
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

      // console.log(dayy, hourr, minn, secc);
      setDayTime(dayy);
      setHourTime(hourr);
      setMinuteTime(minn);
      setSecondsTime(secc);
      // console.log(
      //   DayTime + " " + HourTime + " " + MinuteTime + " " + SecondsTime + "" + Items.value
      // );

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
    something();
    if (SecondsTime === 59) {
      reset();
    }
    // start();
  }, []);

  useEffect(() => {
    timeStampsFunction();
  }, [change]);

  const _ = (nr, length = 2, padding = 0) =>
    String(nr).padStart(length, padding);

  return (
    // <div>{_(d) + ":" + _(h) + ":" + _(m) + ":" + _(s)}</div>

    <div>
      {" "}
      {_(DayTime) ?? ""} : {_(HourTime) ?? ""} : {_(MinuteTime) ?? ""} :{" "}
      {_(SecondsTime) ?? ""}{" "}
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
