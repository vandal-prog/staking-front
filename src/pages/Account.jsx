import React, { useContext, useState, forwardRef } from "react";
// import { useTicker } from "../hooks/useTicker";
// import add from "date-fns/add";
import { connect } from "react-redux";

import CommonSection from "../components/ui/Common-section/CommonSection";

import TimerImg from "../assets/images/timer.svg";

import { TransactionContext } from "../context/TransactionContext";

import "../styles/account.css";
import Timer from "../components/ui/timer/timer.component";
import Time from "../components/ui/timer/newTimer.component";

import RecordDataValues from "../components/ui/RecordDataValues/RecordDataValues";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TimeConverter } from "../utils/timeConverter";
import { Snackbar, Alert } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  selectAccountArrayCount,
  selectCumIncomeCount,
  selecttodayIncomeCount,
} from "../redux/user/array.selectors";
import {
  setAccountBalance,
  setPledgeRecords,
} from "../redux/user/user.actions";

const SnackbarAlert = forwardRef(function SnackbarAlert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} {...props} />;
});

const Account = ({
  onChainBalance,
  pledgeIncome,
  pledgeBalance,
  cumulatedPledgeIncome,
  cumulatedPledgeBalance,
  pledgeRecords,
  staking,
  decimals,
  staked,
  pledged,
  ratePercent,
  accountBalance,
  cummulativeIncome,
  todayIncome,
  setAccountBalance,
}) => {
  const [minWithdrawal, setMinWithdrawal] = useState(false);
  const handleClose = () => {
    setMinWithdrawal(false);
  };
  // const { seconds, minutes, hours, days, isTimeUp } = useTicker(futureDate);

  // const futureDate = 1659697200;

  // remainingTime = useTicker(futureDate);
  // const settingsInfo = useContext(TransactionContext);
  // const { isPaused, setIsPaused } = settingsInfo;
  // console.log(isPaused);

  const DataValues = ({ title, value }) => (
    <div className="datavalues">
      <div className="datavalues-title">{title}</div>
      <div className="datavalues-value">{value}</div>
    </div>
  );

  const [inputData, setInputData] = useState({
    withdrawalAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevState) => ({ ...prevState, [name]: value }));
  };
  const withdrawalAmount = Number(inputData.withdrawalAmount);

  // const now = new Date();
  // let nowTime = TimeConverter(1661002435000);
  // console.log(nowTime);

  // Function to withdraw
  const withdrawTokens = async (amount) => {
    const newAmount = amount * decimals;
    const withdraw = await staking.withdrawReward(newAmount);
    const reciept = withdraw.wait();
    console.log(reciept);
  };

  const checkwithdrawalAmount = (withdrawalAmount) => {
    if (withdrawalAmount < 10) {
      setMinWithdrawal(true);
    } else {
      withdrawTokens(withdrawalAmount);
      setAccountBalance(-withdrawalAmount);
    }
  };
  // console.log(reciept);

  return (
    <>
      <CommonSection title={"Account"} />

      <div className="account-container">
        <div className="account-info">
          <div className="account-value">{accountBalance}</div>
          <span className="account-valuetext">ACCOUNT BALANCE</span>
          <div className="account-timer">
            <img
              style={{ height: "18px", width: "18px" }}
              className="timer-icon"
              src={TimerImg}
            />
            <span className="account-timer-text">NEXT BENEFIT IN 1hr</span>
            {/* {`${remainingTime.days}:${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}`} */}

            {/* <Timer /> */}
            {staked && <Time localStorage="timer1" />}
            {pledged && <Timer localStorage="timer2" />}
            {staked || pledged || <Time />}
            {/* <Time localStorage="timer1" /> */}
          </div>
          <input
            name="withdrawalAmount"
            type="number"
            className="account-infoInput"
            onChange={handleChange}
          />
          <button
            className="account-infobtn"
            onClick={() => {
              checkwithdrawalAmount(withdrawalAmount);
            }}
          >
            Auto Withdrawal
          </button>
        </div>
        <Snackbar
          open={minWithdrawal}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <SnackbarAlert onClose={handleClose} severity="warning">
            Less than minimum withdrawal
          </SnackbarAlert>
        </Snackbar>
        <div className="account-container-header">NFT market making income</div>
        <div className="account-marketBal">
          <DataValues title="On-chain balance" value={`${onChainBalance}`} />
          <DataValues
            title="Current rate of return"
            value={`${ratePercent}%`}
          />
          <DataValues title="Today's income" value={`${todayIncome}USDT`} />
          <DataValues
            title="Cummulative income"
            value={`${cummulativeIncome}USDT`}
          />
        </div>
        <div className="account-container-header">NFT pledge income</div>
        <div className="accoount-pledge">
          <DataValues title="Current pledge" value={`${pledgeBalance}USDT`} />
          <DataValues title="Current income" value={`${pledgeIncome}USDT`} />
          <DataValues
            title="Cumulative pledge"
            value={`${cumulatedPledgeBalance}USDT`}
          />
          <DataValues
            title="Cumulative income"
            value={`${cumulatedPledgeIncome}USDT`}
          />
        </div>
        <div className="account-container-header">Change account records</div>
        <div className="account-records">
          {pledgeRecords.length ? (
            <>
              {pledgeRecords.map((record, index) => (
                <RecordDataValues
                  key={index}
                  date={record.pledgeTime}
                  value={record.pledgeAmount}
                />
              ))}
            </>
          ) : (
            <div className="acount-records-empty">
              <DeleteForeverIcon
                sx={{
                  width: 100,
                  height: 100,
                  opacity: 0.5,
                }}
              />
              <p className="acount-records-icon-text">No Data</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  onChainBalance: state.data.onChainBalance,
  pledgeIncome: state.data.pledgeIncome,
  pledgeBalance: state.data.pledgeBalance,
  cumulatedPledgeIncome: state.data.cumulatedPledgeIncome,
  cumulatedPledgeBalance: state.data.cumulatedPledgeBalance,
  pledgeRecords: state.array.pledgeRecords,
  decimals: state.user.decimals,
  staking: state.user.staking,
  staked: state.boolean.staked,
  pledged: state.boolean.pledged,
  ratePercent: state.data.ratePercent,
  accountBalance: selectAccountArrayCount(state),
  cummulativeIncome: selectCumIncomeCount(state),
  todayIncome: selecttodayIncomeCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  setAccountBalance: (balance) => dispatch(setAccountBalance(balance)),
  setPledgeRecords: () => dispatch(setPledgeRecords()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
