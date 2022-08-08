import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import "./pledgerecords.css";

const PLEDGE_LINKS = [
  {
    display: "Transferring",
    url: "/records/transferring",
  },
  {
    display: "In progress",
    url: "/records/progress",
  },
  {
    display: "Completed",
    url: "/records/completed",
  },
];

const PledgeRecords = () => {
  return (
    <div className="pledgerecords">
      <h6 className="text-center text-light pledgerecords-header">
        Pledge record
      </h6>

      <div className="pledgerecords-navigation">
        {/* <div className="pledgerecords-navigation-item">
          <Link to="/records/transferring">Transferring</Link>
        </div>
        <div className="pledgerecords-navigation-item">
          <Link to="/records/progress">In progress</Link>
        </div>
        <div className="pledgerecords-navigation-item">
          <Link to="/records/completed">Completed</Link>
        </div> */}

        {PLEDGE_LINKS.map((item, index) => (
          <div className="">
            <NavLink
              to={item.url}
              className={(navClass) =>
                navClass.isActive
                  ? "pledgelink-active pledgerecords-navigation-item"
                  : "pledgerecords-navigation-item"
              }
            >
              {item.display}
            </NavLink>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export default PledgeRecords;
