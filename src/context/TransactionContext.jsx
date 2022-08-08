import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { add } from "date-fns";

import { useTicker } from "../hooks/useTicker";
import { getRemainingTimeUntilMsTimestamp } from "../utils/countdownTimer";

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
  //state for current user account
  const [currentAccount, setCurrentAccount] = useState("");

  // variable and state to render countdown timer
  const defaultRemainingTime = {
    seconds: "00",
    minutes: "00",
    hours: "00",
    days: "00",
  };

  // const futureDate = add(new Date(), {
  //   days: 0,
  //   hours: 1,
  //   minutes: 0,
  // });

  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  // const hourTimestamp = 1659697200000;

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     updateRemainingTime(hourTimestamp);
  //   }, 1000);
  //   return () => clearInterval(intervalId);
  // }, [hourTimestamp]);

  // // const updateRemainingTime = ({ futureDate }) => {
  // //   return setRemainingTime(useTicker(futureDate));
  // // };

  // const updateRemainingTime = (hourTimestamp) => {
  //   return setRemainingTime(getRemainingTimeUntilMsTimestamp(hourTimestamp));
  // };

  //Trying new timer function 08/08/22
  const [workMinutes, setWorkMinutes] = useState(60);
  const [breakMinutes, setBreakMinutes] = useState(60);

  const [isPaused, setIsPaused] = useState(false);

  // function that checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      //if no wallet is found in browser it returns this
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

  // function that connects the wallet
  const connectWallet = async () => {
    try {
      //if no wallet is found in browser it returns this
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
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        defaultRemainingTime,
        setRemainingTime,
        setCurrentAccount,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
        isPaused,
        setIsPaused,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
