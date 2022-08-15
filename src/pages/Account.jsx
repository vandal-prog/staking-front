import React, { useContext } from "react";
// import { useTicker } from "../hooks/useTicker";
// import add from "date-fns/add";
import { connect } from "react-redux";

import CommonSection from "../components/ui/Common-section/CommonSection";

import TimerImg from "../assets/images/timer.svg";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// import { TransactionContext } from "../context/TransactionContext";
import RecordDataValues from "../components/ui/RecordDataValues/RecordDataValues";

import "../styles/account.css";
import Timer from "../components/ui/timer/timer.component";

const Account = ({ onChainBalance, pledgeRecords }) => {
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

  return (
    <>
      <CommonSection title={"Account"} />

      <div className="account-container">
        <div className="account-info">
          <div className="account-value">0</div>
          <span className="account-valuetext">ACCOUNT BALANCE</span>
          <div className="account-timer">
            <img
              style={{ height: "18px", width: "18px" }}
              className="timer-icon"
              src={TimerImg}
            />
            <span className="account-timer-text">NEXT BENEFIT</span>
            {/* {`${remainingTime.days}:${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}`} */}
            <Timer />
          </div>
          <input type="number" className="account-infoInput" />
          <button className="account-infobtn" onClick={() => {}}>
            Auto Withdrawal
          </button>
        </div>
        <div className="account-container-header">NFT market making income</div>
        <div className="account-marketBal">
          <DataValues title="On-chain balance" value={`${onChainBalance}`} />
          <DataValues title="Current rate of return" value={`${0}%`} />
          <DataValues title="Today's income" value={`${0}USDT`} />
          <DataValues title="Cummulative income" value={`${0}USDT`} />
        </div>
        <div className="account-container-header">NFT pledge income</div>
        <div className="accoount-pledge">
          <DataValues title="Current pledge" value={`${0}USDT`} />
          <DataValues title="Current income" value={`${0}USDT`} />
          <DataValues title="Cumulative pledge" value={`${0}USDT`} />
          <DataValues title="Cumulative income" value={`${0}USDT`} />
        </div>
        <div className="account-container-header">Change account records</div>
        <div className="account-records">
          {pledgeRecords.length ? (
            <>
              <RecordDataValues date="2022/06/09 03:00" value="+0.1234545" />
              <RecordDataValues date="2022/06/09 03:00" value="+0.1234545" />
              <RecordDataValues date="2022/06/09 03:00" value="+0.1234545" />
              <RecordDataValues date="2022/06/09 03:00" value="+0.1234545" />
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
  onChainBalance: state.user.onChainBalance,
  pledgeRecords: state.user.pledgeRecords,
});

export default connect(mapStateToProps)(Account);
