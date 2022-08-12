import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

import { Provider } from "react-redux";
import store from "./redux/store";

import { TransactionProvider } from "./context/TransactionContext";

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  // <TransactionProvider>
  <Provider store={store}>
    <Web3ReactProvider>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </Web3ReactProvider>
  </Provider>,
  // </TransactionProvider>,
  document.getElementById("root")
);
