import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";


import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

function getLibrary(provider) {
  return new Web3(provider)
}

ReactDOM.render(
  <React.StrictMode>
     <Web3ReactProvider getLibrary={getLibrary}>
    <Router>
      <App />
    </Router>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
