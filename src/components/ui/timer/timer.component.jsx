import { set } from "date-fns/esm";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  hasPledged,
  setAccountBalance,
  setCumulatedPledgeBalance,
  setCumulatedPledgeIncome,
  setPledgedBalance,
  setPledgedIncome,
  setPledgeRecords,
  setRate,
} from "../../../redux/user/user.actions";

class Timer extends Component {
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
      pledged,
      hasPledged,
      pledgeIncome,
      setAccountBalance,
      setCumulatedPledgeBalance,
      setCumulatedPledgeIncome,
      setPledgeBalance,
      setPledgeIncome,
      setPledgeRecords,
      days,
      setRate,
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
      pledged && start();
    }

    const processPledgeTransactions = async () => {
      await setPledgeIncome();
      setAccountBalance(pledgeIncome);
      setPledgeBalance();
      setCumulatedPledgeBalance();
      setCumulatedPledgeIncome();
      setPledgeRecords();
    };

    // console.log("i love myself");
    if (d === days || d > days) {
      reset();
      processPledgeTransactions();
      setRate(0);
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
  pledged: state.boolean.pledged,
  pledgeIncome: state.data.pledgeIncome,
  days: state.data.days,
});

const mapDispatchToProps = (dispatch) => ({
  hasPledged: () => dispatch(hasPledged()),
  setAccountBalance: (balance) => dispatch(setAccountBalance(balance)),
  setPledgeIncome: () => dispatch(setPledgedIncome()),
  setPledgeBalance: () => dispatch(setPledgedBalance()),
  setCumulatedPledgeIncome: () => dispatch(setCumulatedPledgeIncome()),
  setCumulatedPledgeBalance: () => dispatch(setCumulatedPledgeBalance()),
  setPledgeRecords: () => dispatch(setPledgeRecords()),
  setRate: (percent) => dispatch(setRate(percent)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
