import React from "react";
import { connect } from "react-redux";
import RecordDataValues from "../RecordDataValues/RecordDataValues";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";


const Transferring = ({ pledgeRecords,  }) => {

  return (
    <div className="account-container">
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
  );
};

const mapStateToProps = (state) => ({
  pledgeRecords: state.user.pledgeRecords,
});

export default connect(mapStateToProps)(Transferring);
