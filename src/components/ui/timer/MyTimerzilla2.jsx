import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  selectDays,
  selectHours,
  selectMinutes,
  selectSeconds,
} from "../../../redux/user/time-selectors";
import {
  setAccountBalance,
  setCumulativeIncome,
  setDayTime,
  setHourlyIncome,
  setHourTime,
  setMinuteTime,
  setSecondsTime,
  setStakeRecords,
  setTodayIncome,
} from "../../../redux/user/user.actions";
import Axios from "axios";

const Timerzilla3 = ({
  stakedvalue,
  hourlyIncome,
  setAccountBalance,
  setTodayIncome,
  setCumulativeIncome,
  setStakeRecords,
  currentAccount,
}) => {
  const [UserWallet, setUserWallet] = useState(
    "0xDD63BAa1bEF2FB5EA96797489dc3E03f7d1b3340"
  );
  const [UpdatedTIme, setUpdatedTIme] = useState(false);
  const [TimeOut, setTimeOut] = useState({ status: false, number: 0 });

  const UpdateLastprofitdrop = () => {
    Axios.put(
      `https://nftmetapool.herokuapp.com/user/staking/${currentAccount}`
    )
      .then((response) => {
        setUpdatedTIme(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        alert("Error dey");
      });
  };

  const processTransactions = async () => {
    // await setHourlyIncome();
    setAccountBalance(hourlyIncome);
    setTodayIncome(hourlyIncome);
    setCumulativeIncome(hourlyIncome);
  };

  useEffect(() => {
    if (stakedvalue) {
      Axios.get(
        `https://nftmetapool.herokuapp.com/user/staking/${currentAccount}`
      )
        .then((response) => {
          setUpdatedTIme(response.data);
        })
        .catch((err) => {
          alert("Error dey");
        });
    } else {
    }
  }, []);

  useEffect(() => {
    if (UpdatedTIme.hours > 0) {
      // run the for loop for the adding of profit to the amount of hours
      for (let i; i < UpdatedTIme.hours + 1; i++) {
        processTransactions();

        const nowTime = Date.now();
        const recordArray = [nowTime, hourlyIncome];
        setStakeRecords(recordArray);
      }
      // and make sure you run this function as well after the for loop

      UpdateLastprofitdrop();
    }

    if (UpdatedTIme.oldMunites > UpdatedTIme.newMunites) {
      let nextProfitdrop = UpdatedTIme.oldMunites - UpdatedTIme.newMunites;

      setTimeOut({ status: true, number: nextProfitdrop * 60000 });
    }

    if (UpdatedTIme.newMunites > UpdatedTIme.oldMunites) {
      let nextProfitdrop = UpdatedTIme.newMunites - UpdatedTIme.oldMunites;

      nextProfitdrop = 60 - nextProfitdrop;
      setTimeOut({ status: true, number: nextProfitdrop * 60000 });
    }
  }, [UpdatedTIme]);

  useEffect(() => {
    let diff = TimeOut.number - 1000;
    let newTimeout = TimeOut.number;
    // console.log(TimeOut,diff)

    if (newTimeout > 1000) {
      const timer = setTimeout(() => {
        setTimeOut({
          ...TimeOut,
          number: diff,
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
    if (newTimeout < 1000 || newTimeout === 1000) {
      if (!TimeOut.status) {
        return;
      } else {
        if (TimeOut.status) {
          processTransactions();

          const nowTime = Date.now();
          const recordArray = [nowTime, hourlyIncome];
          setStakeRecords(recordArray);

          // setTimeOut(3600000);
          UpdateLastprofitdrop();
          setTimeOut(3600000);
        }
      }
    }
  }, [TimeOut]);

  // const dayy = Math.floor(TimeOut / 86400000);
  // const hourr = Math.floor(TimeOut / 3600000) % 24;

  const d = Math.floor(TimeOut.number / 86400000);
  const h = Math.floor(TimeOut.number / 3600000) % 24;
  const m = Math.floor(TimeOut.number / 60000) % 60;
  const s = Math.floor(TimeOut.number / 1000) % 60;

  const _ = (nr, length = 2, padding = 0) =>
    String(nr).padStart(length, padding);

  return (
    <div>
      {TimeOut ? (
        <div>{_(d) + ":" + _(h) + ":" + _(m) + ":" + _(s)}</div>
      ) : (
        "loading"
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  stakedvalue: state.boolean.staked,
  hourlyIncome: state.data.hourlyIncome,
  stakeRecords: state.array.stakeRecords,
  currentAccount: state.account.currentAccount,
});

const mapDispatchToProps = (dispatch) => ({
  // hasStaked: () => dispatch(hasStaked()),
  setHourlyIncome: () => dispatch(setHourlyIncome()),
  setAccountBalance: (balance) => dispatch(setAccountBalance(balance)),
  setTodayIncome: (hourlyIncome) => dispatch(setTodayIncome(hourlyIncome)),
  setCumulativeIncome: (hourlyIncome) =>
    dispatch(setCumulativeIncome(hourlyIncome)),
  // setRate: (percent) => dispatch(setRate(percent)),
  // setOnChainBalance: () => dispatch(setOnChainBalance()),
  setStakeRecords: (record) => dispatch(setStakeRecords(record)),
  setDayTime: (day) => dispatch(setDayTime(day)),
  setHourTime: (hour) => dispatch(setHourTime(hour)),
  setMinuteTime: (minute) => dispatch(setMinuteTime(minute)),
  setSecondsTime: (second) => dispatch(setSecondsTime(second)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timerzilla3);
