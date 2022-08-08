import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Account from "../pages/Account";

import Wallet from "../pages/Wallet";
import NftDetails from "../pages/NftDetails";

import PledgeRecords from "../components/ui/pledgerecords/Pledgerecord";
import Transferring from "../components/ui/transferring/transferring";
import Progress from "../components/ui/progress/progress";
import Completed from "../components/ui/completed/completed";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/records" element={<PledgeRecords />}>
        <Route path="transferring" element={<Transferring />} />
        <Route path="progress" element={<Progress />} />
        <Route path="completed" element={<Completed />} />
      </Route>

      <Route path="/market" element={<Market />} />
      <Route path="/create" element={<Create />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/account" element={<Account />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/market/:id" element={<NftDetails />} />
    </Routes>
  );
};

export default Routers;
