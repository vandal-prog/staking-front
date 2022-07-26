// import React, { Component } from "react";
// import { connect } from "react-redux";
// import {
//   selectDays,
//   selectHours,
//   selectMinutes,
//   selectSeconds,
// } from "../../../redux/user/time-selectors";

// import {
//   hasStaked,
//   setCumulativeIncome,
//   setHourlyIncome,
//   setTodayIncome,
//   setAccountBalance,
//   setRate,
//   setOnChainBalance,
//   setStakeRecords,
//   setSecondsTime,
//   setMinuteTime,
//   setHourTime,
//   setDayTime,
// } from "../../../redux/user/user.actions";

// class Time extends Component {
//   constructor(props) {
//     super(props);

//     try {
//       this.state = JSON.parse(localStorage.getItem(this.props.localStorage));
//     } catch (error) {}

//     if (!this.state) {
//       this.state = this.saveChanges({
//         running: false,
//         value: 0,
//       });
//     }
//   }

//   saveChanges(state) {
//     console.log("saveChanges", this.props.localStorage, state);
//     if (this.props.localStorage) {
//       localStorage.setItem(this.props.localStorage, JSON.stringify(state));
//     }
//     return state;
//   }

//   stop = () => {
//     const now = Date.now();

//     this.setState(({ running, value }) => {
//       if (!running) return null;

//       clearInterval(this.timer);
//       return this.saveChanges({
//         running: false,
//         value: value + now,
//       });
//     });
//   };

//   reset = () => {
//     const now = Date.now();

//     this.setState(({ running, value }) => {
//       return this.saveChanges({
//         running: false,
//         value: 0,
//       });

//       //just reset the timer to 0, don' stop it
//       //return this.saveChanges({
//       //  running,
//       //  value: running? -now: 0
//       //});
//     });
//   };

//   start = () => {
//     const now = Date.now();

//     this.setState(({ running, value }) => {
//       if (running) return null;

//       this.timer = setInterval(
//         () => this.forceUpdate(),
//         this.props.interval | 0
//       );

//       return this.saveChanges({
//         running: true,
//         value: value - now,
//       });
//     });
//   };

//   UNSAFE_componentWillMount() {
//     if (this.state.running) {
//       const {
//         h,
//         m,
//         hourlyIncome,
//         setHourlyIncome,
//         setAccountBalance,
//         setTodayIncome,
//         setCumulativeIncome,
//         setStakeRecords,
//         hasStaked,
//         staked,
//       } = this.props;

//       const processTransactions = async () => {
//         // await setHourlyIncome();
//         setAccountBalance(hourlyIncome);
//         setTodayIncome(hourlyIncome);
//         setCumulativeIncome(hourlyIncome);
//         // const nowTime = new Date();
//         // const recordArray = [nowTime, hourlyIncome];
//         // setStakeRecords(recordArray);
//       };

//       this.timer = setInterval(() => {
//         if (h > 1) {
//           this.stop();
//           for (let i = 1; i < h + 1; i++) {
//             processTransactions();
//             let nowTime = Date.now();
//             const recordArray = [nowTime, hourlyIncome];
//             setStakeRecords(recordArray);
//           }

//           const now = Date.now();

//           this.saveChanges({
//             running: true,
//             value: -(now - m * 60000),
//           });

//           hasStaked();
//         }

//         this.forceUpdate();
//       }, this.props.interval | 0);
//     }
//   }

//   componentWillUnmount() {
//     if (this.state.running) {
//       clearInterval(this.timer);
//     }
//   }

//   componentDidMount() {
//     if (this.state.running) {
//       const {
//         h,
//         m,
//         hourlyIncome,
//         setHourlyIncome,
//         setAccountBalance,
//         setTodayIncome,
//         setCumulativeIncome,
//         setStakeRecords,
//         hasStaked,
//         staked,
//       } = this.props;

//       const processTransactions = async () => {
//         // await setHourlyIncome();
//         setAccountBalance(hourlyIncome);
//         setTodayIncome(hourlyIncome);
//         setCumulativeIncome(hourlyIncome);
//         // const nowTime = new Date();
//         // const recordArray = [nowTime, hourlyIncome];
//         // setStakeRecords(recordArray);
//       };
//       // if (m === 6) {
//       //   this.reset();
//       //   processTransactions();
//       //   const nowTime = Date.now();
//       //   // let nowTime = -this.state.value;
//       //   const recordArray = [nowTime, hourlyIncome];
//       //   setStakeRecords(recordArray);
//       //   // hasStaked();

//       //   if (staked) {
//       //     this.start();
//       //   } else {
//       //     setRate(0);
//       //     setOnChainBalance();
//       //     return;
//       //   }
//       // }
//     }
//   }

//   render() {
//     const {
//       start,
//       stop,
//       reset,
//       state: { running, value },
//     } = this;

//     const {
//       staked,
//       hasStaked,
//       setHourlyIncome,
//       hourlyIncome,
//       setAccountBalance,
//       setTodayIncome,
//       setCumulativeIncome,
//       setRate,
//       setOnChainBalance,
//       setStakeRecords,
//       stakeRecords,
//       d,
//       h,
//       m,
//       s,
//       setDayTime,
//       setHourTime,
//       setMinuteTime,
//       setSecondsTime,
//     } = this.props;

//     {
//       staked && start();
//     }

//     const timestamp = running ? Date.now() + value : value;

//     const dayy = Math.floor(timestamp / 86400000);
//     const hourr = Math.floor(timestamp / 3600000) % 24;
//     const minn = Math.floor(timestamp / 60000) % 60;
//     const secc = Math.floor(timestamp / 1000) % 60;
//     const ms = timestamp % 1000;
//     setDayTime(dayy);
//     setHourTime(hourr);
//     setMinuteTime(minn);
//     setSecondsTime(secc);

//     const _ = (nr, length = 2, padding = 0) =>
//       String(nr).padStart(length, padding);

//     // {
//     //   //   staked && reset();
//     //   staked && start();
//     // }

//     // if (staked === false) {

//     // }

//     const processTransactions = async () => {
//       // await setHourlyIncome();
//       setAccountBalance(hourlyIncome);
//       setTodayIncome(hourlyIncome);
//       setCumulativeIncome(hourlyIncome);
//       // const nowTime = new Date();
//       // const recordArray = [nowTime, hourlyIncome];
//       // setStakeRecords(recordArray);
//     };

//     if (m === 2) {
//       reset();
//       processTransactions();
//       const nowTime = Date.now();
//       // let nowTime = -this.state.value;
//       const recordArray = [nowTime, hourlyIncome];
//       setStakeRecords(recordArray);
//       // hasStaked();

//       if (staked) {
//         start();
//       } else {
//         setRate(0);
//         setOnChainBalance();
//         return;
//       }
//     }

//     // if (h > 1) {
//     //   for (let i = 1; i < h + 1; i++) {
//     //     processTransactions();
//     //     let nowTime = Date.now();
//     //     const recordArray = [nowTime, hourlyIncome];
//     //     // setStakeRecords(recordArray);
//     //   }
//     // }

//     // if (s === 59) {
//     //   hasStaked();

//     //   if (!staked) {
//     //     reset();
//     //     setRate(0);
//     //     setOnChainBalance();
//     //   }
//     // }

//     return (
//       <div>
//         {/* {staked && reset()} */}
//         {/* // {staked && start()} */}
//         {_(d) + ":" + _(h) + ":" + _(m) + ":" + _(s)}
//         {/* <div className="timer-controls">
//             <button className="btn btn-success" onClick={start}>
//               Start Timer
//             </button>
//             <button className="btn btn-alert" onClick={stop}>
//               Stop Timer
//             </button>
//             <button className="btn btn-danger" onClick={reset}>
//               Reset!
//             </button>
//           </div> */}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   staked: state.boolean.staked,
//   hourlyIncome: state.data.hourlyIncome,
//   stakeRecords: state.array.stakeRecords,
//   d: selectDays(state),
//   h: selectHours(state),
//   m: selectMinutes(state),
//   s: selectSeconds(state),
// });

// const mapDispatchToProps = (dispatch) => ({
//   hasStaked: () => dispatch(hasStaked()),
//   setHourlyIncome: () => dispatch(setHourlyIncome()),
//   setAccountBalance: (balance) => dispatch(setAccountBalance(balance)),
//   setTodayIncome: (hourlyIncome) => dispatch(setTodayIncome(hourlyIncome)),
//   setCumulativeIncome: (hourlyIncome) =>
//     dispatch(setCumulativeIncome(hourlyIncome)),
//   setRate: (percent) => dispatch(setRate(percent)),
//   setOnChainBalance: () => dispatch(setOnChainBalance()),
//   setStakeRecords: (record) => dispatch(setStakeRecords(record)),
//   setDayTime: (day) => dispatch(setDayTime(day)),
//   setHourTime: (hour) => dispatch(setHourTime(hour)),
//   setMinuteTime: (minute) => dispatch(setMinuteTime(minute)),
//   setSecondsTime: (second) => dispatch(setSecondsTime(second)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Time);

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
  setStakeRecords,
  setSecondsTime,
  setMinuteTime,
  setHourTime,
  setDayTime,
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

  UNSAFE_componentWillMount() {
    if (this.state.running) {
      const {
        h,
        m,
        hourlyIncome,
        setHourlyIncome,
        setAccountBalance,
        setTodayIncome,
        setCumulativeIncome,
        setStakeRecords,
        hasStaked,
        staked,
        s,
      } = this.props;

      const processTransactions = async () => {
        await setHourlyIncome();
        setAccountBalance(hourlyIncome);
        setTodayIncome(hourlyIncome);
        setCumulativeIncome(hourlyIncome);
        // const nowTime = new Date();
        // const recordArray = [nowTime, hourlyIncome];
        // setStakeRecords(recordArray);
      };
      this.timer = setInterval(() => {
        if (h > 1) {
          this.stop();
          for (let i = 1; i < h + 1; i++) {
            processTransactions();
            let nowTime = Date.now();
            const recordArray = [nowTime, hourlyIncome];
            setStakeRecords(recordArray);
          }

          const now = Date.now();

          this.saveChanges({
            running: true,
            value: -(now - m * 60000),
          });

          hasStaked();
        }

        this.forceUpdate();
      }, this.props.interval | 0);
    }
  }

  componentWillUnmount() {
    if (this.state.running) {
      clearInterval(this.timer);
    }
  }

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
      setStakeRecords,
      stakeRecords,
      setDayTime,
      setHourTime,
      setMinuteTime,
      setSecondsTime,
    } = this.props;

    const timestamp = running ? Date.now() + value : value;
    const dayy = Math.floor(timestamp / 86400000);
    const hourr = Math.floor(timestamp / 3600000) % 24;
    const minn = Math.floor(timestamp / 60000) % 60;
    const secc = Math.floor(timestamp / 1000) % 60;
    const ms = timestamp % 1000;
    setDayTime(dayy);
    setHourTime(hourr);
    setMinuteTime(minn);
    setSecondsTime(secc);

    const _ = (nr, length = 2, padding = 0) =>
      String(nr).padStart(length, padding);

    {
      staked && start();
    }

    const processTransactions = async () => {
      await setHourlyIncome();
      setAccountBalance(hourlyIncome);
      setTodayIncome(hourlyIncome);
      setCumulativeIncome(hourlyIncome);
      // const nowTime = new Date();
      // const recordArray = [nowTime, hourlyIncome];
      // setStakeRecords(recordArray);
    };

    if (hourr === 1) {
      reset();
      processTransactions();
      const nowTime = Date.now();
      // let nowTime = -this.state.value;
      const recordArray = [nowTime, hourlyIncome];
      setStakeRecords(recordArray);
      hasStaked();

      if (staked) {
        start();
      } else {
        setRate(0);
        setOnChainBalance();
        return;
      }
    }

    if (secc === 59) {
      hasStaked();

      if (!staked) {
        reset();
        setRate(0);
        setOnChainBalance();
      }
    }

    return (
      <div>
        {_(dayy) + ":" + _(hourr) + ":" + _(minn) + ":" + _(secc)}

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
  stakeRecords: state.array.stakeRecords,
  d: state.timer.d,
  h: state.timer.h,
  m: state.timer.m,
  s: state.timer.s,
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
  setStakeRecords: (record) => dispatch(setStakeRecords(record)),
  setDayTime: (day) => dispatch(setDayTime(day)),
  setHourTime: (hour) => dispatch(setHourTime(hour)),
  setMinuteTime: (minute) => dispatch(setMinuteTime(minute)),
  setSecondsTime: (second) => dispatch(setSecondsTime(second)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);
