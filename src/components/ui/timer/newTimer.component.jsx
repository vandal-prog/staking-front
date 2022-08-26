import React, { Component } from "react";
import { connect } from "react-redux";

import {
  hasStaked,
  setCumulativeIncome,
  setHourlyIncome,
  setTodayIncome,
  setAccountBalance,
  setRate,
  setOnChainBalance,
} from "../../../redux/user/user.actions";

class Time extends Component {
  constructor(props) {
    super(props);

    try {
      this.state = JSON.parse(localStorage.getItem(this.props.localStorage));
    } catch (error) {}

    if (!this.state) {
      this.state = this.saveChanges({
        running: false,
        value: 0,
      });
    }
  }

  UNSAFE_componentWillMount() {
    if (this.state.running) {
      this.timer = setInterval(
        () => this.forceUpdate(),
        this.props.interval | 0
      );
    }
  }

  componentWillUnmount() {
    if (this.state.running) {
      clearInterval(this.timer);
    }
  }

  saveChanges(state) {
    console.log("saveChanges", this.props.localStorage, state);
    if (this.props.localStorage) {
      localStorage.setItem(this.props.localStorage, JSON.stringify(state));
    }
    return state;
  }

  start = () => {
    const now = Date.now();

    this.setState(({ running, value }) => {
      if (running) return null;

      this.timer = setInterval(
        () => this.forceUpdate(),
        this.props.interval | 0
      );

      return this.saveChanges({
        running: true,
        value: value - now,
      });
    });
  };

  stop = () => {
    const now = Date.now();

    this.setState(({ running, value }) => {
      if (!running) return null;

      clearInterval(this.timer);
      return this.saveChanges({
        running: false,
        value: value + now,
      });
    });
  };

  reset = () => {
    const now = Date.now();

    this.setState(({ running, value }) => {
      return this.saveChanges({
        running: false,
        value: 0,
      });

      //just reset the timer to 0, don' stop it
      //return this.saveChanges({
      //  running,
      //  value: running? -now: 0
      //});
    });
  };

  render() {
    const {
      start,
      stop,
      reset,
      state: { running, value },
    } = this;

    const {
      staked,
      hasStaked,
      setHourlyIncome,
      hourlyIncome,
      setAccountBalance,
      setTodayIncome,
      setCumulativeIncome,
      setRate,
      setOnChainBalance,
    } = this.props;

    const timestamp = running ? Date.now() + value : value;
    const d = Math.floor(timestamp / 86400000);
    const h = Math.floor(timestamp / 3600000) % 24;
    const m = Math.floor(timestamp / 60000) % 60;
    const s = Math.floor(timestamp / 1000) % 60;
    const ms = timestamp % 1000;

    const _ = (nr, length = 2, padding = 0) =>
      String(nr).padStart(length, padding);

    {
      //   staked && reset();
      staked && start();
    }

    const processTransactions = async () => {
      await setHourlyIncome();
      setAccountBalance(hourlyIncome);
      setTodayIncome(hourlyIncome);
      setCumulativeIncome(hourlyIncome);
    };

    // console.log("i love myself");
    if (h == 1) {
      reset();
      processTransactions();
      hasStaked();

      if (staked) {
        start();
      } else {
        setRate(0);
        setOnChainBalance();
        return;
      }
    }

    if (m == 1) {
      hasStaked();

      if (!staked) {
        setRate(0);
        setOnChainBalance();
      }
    }

    return (
      <div>
        {_(d) + ":" + _(h) + ":" + _(m) + ":" + _(s)}

        {/* <div className="timer-controls">
            <button className="btn btn-success" onClick={start}>
              Start Timer
            </button>

            <button className="btn btn-alert" onClick={stop}>
              Stop Timer
            </button>

            <button className="btn btn-danger" onClick={reset}>
              Reset!
            </button>
          </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  staked: state.boolean.staked,
  hourlyIncome: state.data.hourlyIncome,
});

const mapDispatchToProps = (dispatch) => ({
  hasStaked: () => dispatch(hasStaked()),
  setHourlyIncome: () => dispatch(setHourlyIncome()),
  setAccountBalance: (balance) => dispatch(setAccountBalance(balance)),
  setTodayIncome: (hourlyIncome) => dispatch(setTodayIncome(hourlyIncome)),
  setCumulativeIncome: (hourlyIncome) =>
    dispatch(setCumulativeIncome(hourlyIncome)),
  setRate: (percent) => dispatch(setRate(percent)),
  setOnChainBalance: () => dispatch(setOnChainBalance()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);
