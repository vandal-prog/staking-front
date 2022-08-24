import React, { useState, useEffect } from "react";
import Routers from "../../routes/Routers";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BounceLoader from "react-spinners/BounceLoader";

import "./layout.css";

const Layout = () => {
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 4000);
  // }, []);
  return (
    <div>
      {loading ? (
        <div className="centered-spinner">
          <BounceLoader
            color={"#BD10E0"}
            loading={loading}
            size={60}
            speedMultiplier={1}
          />
        </div>
      ) : (
        <div>
          <Header />
          <div>
            <Routers />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
