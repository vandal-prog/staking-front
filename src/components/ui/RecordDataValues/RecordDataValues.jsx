import React from "react";

const RecordDataValues = ({ date, value }) => {
  return (
    <div className="recordvalue">
      <div className="recordvalue-date">
        <span className="recordvalue-date-text">Income</span>
        <div className="recordvalue-date-time">{date}</div>
      </div>
      <div className="recordvalue-value">{value}USDT</div>
    </div>
  );
};

export default RecordDataValues;
