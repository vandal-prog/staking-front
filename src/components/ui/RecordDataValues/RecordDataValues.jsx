import React from "react";
import { connect } from "react-redux";
import { TimeConverter } from "../../../utils/timeConverter";

const RecordDataValues = ({ date, value, decimals }) => {
  const newDate = date * 1000;
  const displayDate = TimeConverter(newDate);
  const displayValue = value / decimals;

  return (
    <div className="recordvalue">
      <div className="recordvalue-date">
        <span className="recordvalue-date-text">Income</span>
        <div className="recordvalue-date-time">{displayDate}</div>
      </div>
      <div className="recordvalue-value">+{displayValue}USDT</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  decimals: state.data.decimals,
});

export default connect(mapStateToProps)(RecordDataValues);
