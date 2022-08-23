import React, { useContext, useState } from "react";
// import { useTicker } from "../hooks/useTicker";
// import add from "date-fns/add";
import { connect } from "react-redux";

import CommonSection from "../components/ui/Common-section/CommonSection";

import TimerImg from "../assets/images/timer.svg";

import { TransactionContext } from "../context/TransactionContext";

import "../styles/account.css";
import Timer from "../components/ui/timer/timer.component";
import RecordDataValues from "../components/ui/RecordDataValues/RecordDataValues";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { TimeConverter } from "../utils/timeConverter";

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
  hourlyIncome,
  pledged,
  ratePercent,
}) => {
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
  let nowTime = TimeConverter(1661002435000);
  console.log(nowTime);

  // Function to withdraw
  const withdrawTokens = async (amount) => {
    const withdraw = await staking.withdrawReward(amount * decimals);
    const reciept = withdraw.wait();
  };

  // console.log(reciept);

  return (
    <>
      <CommonSection title={"Account"} />

      <div className="account-container">
        <div className="account-info">
          <div className="account-value">
            {staked ? hourlyIncome : pledgeIncome}
          </div>
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
          <input
            name="withdrawalAmount"
            type="number"
            className="account-infoInput"
            onChange={handleChange}
          />
          <button
            className="account-infobtn"
            onClick={() => {
              withdrawTokens(withdrawalAmount * decimals);
            }}
          >
            Auto Withdrawal
          </button>
        </div>
        <div className="account-container-header">NFT market making income</div>
        <div className="account-marketBal">
          <DataValues title="On-chain balance" value={`${onChainBalance}`} />
          <DataValues
            title="Current rate of return"
            value={`${ratePercent}%`}
          />
          <DataValues title="Today's income" value={`${hourlyIncome}USDT`} />
          <DataValues title="Cummulative income" value={`${0}USDT`} />
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
  onChainBalance: state.data.onChainBalance,
  pledgeIncome: state.data.pledgeIncome,
  pledgeBalance: state.data.pledgeBalance,
  cumulatedPledgeIncome: state.data.cumulatedPledgeIncome,
  cumulatedPledgeBalance: state.data.cumulatedPledgeBalance,
  pledgeRecords: state.user.pledgeRecords,
  decimals: state.user.decimals,
  staking: state.user.staking,
  staked: state.user.staked,
  pledged: state.user.pledged,
  hourlyIncome: state.data.hourlyIncome,
  ratePercent: state.data.ratePercent,
});

export default connect(mapStateToProps)(Account);
