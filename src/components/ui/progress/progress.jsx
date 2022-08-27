import React from "react";
import { connect } from "react-redux";

import RecordDataValues from "../RecordDataValues/RecordDataValues";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Progress = ({ pledgeRecords }) => {
  return (
    <div className="account-container">
      <div className="account-records">
        {/* {pledgeRecords.length ? (
          <>
            {pledgeRecords.map((record, index) => (
              <RecordDataValues
                key={index}
                date={record.pledgeTime}
                value={record.pledgeAmount}
              />
            ))}
          </>
        ) : ( */}
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
        {/* )} */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pledgeRecords: state.array.pledgeRecords,
});

export default connect(mapStateToProps)(Progress);
