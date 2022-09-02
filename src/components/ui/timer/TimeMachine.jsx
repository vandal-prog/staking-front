import { useState, useEffect } from "react";
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

const TimeMAchine = ({
  d,
  h,
  m,
  s,
  setDayTime,
  setHourTime,
  setMinuteTime,
  setSecondsTime,
}) => {
  const [refreshing, setRefreshing] = useState(0);
  const [oldDate, setoldDate] = useState(
    "thu Sep 01 2022 13:08:47 GMT+0100 (West Africa Standard Time)"
  );
  const [futureDate, setFutureDate] = useState(0);
  useEffect(() => {
    const timeInterval = setInterval(() => {
      //   var mins = currentdate.getMinutes();
      //   var secs = currentdate.getSeconds();
      //   console.log(mins, secs);
      //   var response =
      //     "it will be " +
      //     (60 - mins - 1) +
      //     " minutes and " +
      //     (60 - secs) +
      //     " seconds until the next profit";
      //   console.log(`${hh} : ${mm} : ${ss}`);
      //   console.log(response);
      //   minn = 60 - mins - 1 + mins;
      //   secc = 60 - secs;
      //   setRefreshing(secc);
      //   setMinuteTime(minn);
      //   setSecondsTime(refreshing);
      //   dayy = 0;
      //   hourr = 0;
      //   console.log(`God is good`);
      //   var currentdate = Date.now();
      //   setoldDate(currentdate);
      //   let futureDate = currentdate + 3600000;
      //   setFutureDate(futureDate);
      //   console.log(futureDate);
      //   let difference = futureDate - oldDate;
      //   console.log(difference);
      //   const hh = Math.floor(difference / 1000 / 60 / 60);
      //   difference -= hh * 1000 * 60 * 60;
      //   const mm = Math.floor(difference / 1000 / 60);
      //   difference -= mm * 1000 * 60;
      //   const ss = Math.floor(difference / 1000);
      //   difference -= ss * 1000;
      //   setSecondsTime(ss);
      //   setMinuteTime(mm);
    }, 1000);
    return () => clearInterval(timeInterval);
    // const timeInterval = setInterval(() => {}, 1000);
    // return () => clearInterval(timeInterval);
  }, [futureDate, oldDate]);

  const addProfits = (hh) => {
    for (let i = 0; i < hh; i++) {
      // the function to add profits goes here
    }
    var newDatetoset = new Date();
    // set the old date
    setoldDate(newDatetoset);
  };

  // this is the past date and time
  //   var pastdate = new Date(oldDate);

  //  this is the current time

  //  this is the difference between both time (it would give you numbers like 34555464647747)
  //   const diff = currentdate.getTime() - pastdate.getTime();

  //  this part is converting that numbers the difference would give you to hrs,min and seconds

  //   let msec = diff;
  console.log(`why`);
  //   console.log(msec);

  //   if (hh > 0) {
  //     addProfits(hh);
  //   }

  // this part calculates the how many munites and seconds before the next hour

  //   var mins = currentdate.getMinutes();
  //   var secs = currentdate.getSeconds();
  //   var response =
  //     "it will be " +
  //     (60 - mins - 1) +
  //     " minutes and " +
  //     (60 - secs) +
  //     " seconds until the next profit";

  //   let minn = 60 - mins - 1;
  //   let secc = 60 - secs;
  //   let dayy = 0;
  //   let hourr = 0;

  //   console.log(`${hh} : ${mm} : ${ss}`);
  //   console.log(response);

  let minn = 0;
  let secc = 0;
  let hourr = 0;
  let dayy = 0;

  const _ = (nr, length = 2, padding = 0) =>
    String(nr).padStart(length, padding);

  return <div className="">{_(d) + ":" + _(h) + ":" + _(m) + ":" + _(s)}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeMAchine);
