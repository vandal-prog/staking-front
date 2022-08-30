import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";

// import { Web3ReactProvider } from "@web3-react/core";
// import Web3 from "web3";

import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";

// import { TransactionProvider } from "./context/TransactionContext";

// function getLibrary(provider) {
//   return new Web3(provider);
// }

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
