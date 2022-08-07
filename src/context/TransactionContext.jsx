import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  console.log({
    provider,
    signer,
  });
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      //if now wallet is found in browser it returns this
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        //getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      //if now wallet is found in browser it returns this
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      //Set the account to the choosen account of the wallet
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
      {children}
    </TransactionContext.Provider>
  );
};
