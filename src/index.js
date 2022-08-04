import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import { TransactionProvider } from "./context/TransactionContext";

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <TransactionProvider>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </TransactionProvider>,

  document.getElementById("root")
);

{
  /* <Web3ReactProvider getLibrary={getLibrary}></Web3ReactProvider> */
}
