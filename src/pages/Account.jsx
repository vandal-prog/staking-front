import React, { useContext } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";

import TimerImg from "../assets/images/timer.svg";

import "../styles/account.css";

const Account = () => {
  const DataValues = ({ title, value }) => (
    <div className="datavalues">
      <div className="datavalues-title">{title}</div>
      <div className="datavalues-value">{value}</div>
    </div>
  );

  const RecordDataValues = ({ date, value }) => (
    <div className="recordvalue">
      <div className="recordvalue-date">
        <span className="recordvalue-date-text">Income</span>
        <div className="recordvalue-date-time">{date}</div>
      </div>
      <div className="recordvalue-value">{value}</div>
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
              alt="time icon"
            />
            <span className="account-timer-text">NEXT BENEFIT</span>
            {`00:00:00`}
          </div>
          <input type="number" className="account-infoInput" />
          <button className="account-infobtn">Auto Withdrawal</button>
        </div>
        <div className="account-container-header">NFT market making income</div>
        <div className="account-marketBal">
          <DataValues title="On-chain balance" value={`${0}`} />
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
          <RecordDataValues date="2022/06/09 03:00" value="+0.1234545USDT" />
          <RecordDataValues date="2022/06/09 03:00" value="+0.1234545USDT" />
          <RecordDataValues date="2022/06/09 03:00" value="+0.1234545USDT" />
          <RecordDataValues date="2022/06/09 03:00" value="+0.1234545USDT" />
        </div>
      </div>
    </>
  );
};

export default Account;
