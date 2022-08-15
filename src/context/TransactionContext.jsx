
// import React, { useState, useEffect, useReducer } from "react";
// import { ethers } from "ethers";
// import { BigNumber } from "ethers/lib/ethers";
// import { add } from "date-fns";

// import Web3 from "web3";
// import Staking from "../BlockchainData/build/Staking.json";
// import USDT from "../BlockchainData/build/IERC20.json";

// import { useTicker } from "../hooks/useTicker";
// import { getRemainingTimeUntilMsTimestamp } from "../utils/countdownTimer";

// import { initialState } from "./transactionReducer";

// export const TransactionContext = React.createContext(initialState);

// const { ethereum } = window;

// const contractAddress = "0xbF3aF2FA79ba903aCd7108D0A629B8CC9e33F4f8";
// const USDTaddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";

// const getStakingContract = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const transactionContract = new ethers.Contract(
//     contractAddress,
//     Staking.abi,
//     signer
//   );

//   return transactionContract;
// };
// // const provider = new ethers.providers.Web3Provider(ethereum);

// const getUSDTContract = () => {
//   const signer = provider.getSigner();
//   const transactionContract = new ethers.Contract(
//     USDTaddress,
//     USDT.abi,
//     signer
//   );

//   return transactionContract;
// };

// export const TransactionProvider = ({ children }) => {
//   //state for current user account

//   // variable and state to render countdown timer
//   const defaultRemainingTime = {
//     seconds: "00",
//     minutes: "00",
//     hours: "00",
//     days: "00",
//   };

//   // const futureDate = add(new Date(), {
//   //   days: 0,
//   //   hours: 1,
//   //   minutes: 0,
//   // });

//   const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

//   // const hourTimestamp = 1659697200000;

//   //Trying new timer function 08/08/22
//   const [workMinutes, setWorkMinutes] = useState(60);
//   const [breakMinutes, setBreakMinutes] = useState(60);

//   const [isPaused, setIsPaused] = useState(false);

//   //////////
//   const staking = getStakingContract();
//   const usdt = getUSDTContract();
//   // let currentAccount;

//   // const initialState = {
//   //   currentAccount: "",
//   //   onChainBalance: "",
//   //   staking,
//   //   usdt,
//   //   decimals: 1000000,
//   // };

//   const blockchainReducer = (state, action) => {
//     switch (action.type) {
//       case "CONNECT_WALLET":
//         return {
//           ...state,
//           currentAccount: (state.currentAccount = action.payload),
//         };

//       case "GET_BALANCE":
//         console.log(action.payload);
//         return {
//           ...state,
//           onChainBalance: (state.onChainBalance = action.payload),
//         };
//       default:
//         return;
//     }
//   };

//   const [state, dispatch] = useReducer(blockchainReducer, initialState);

//   // Set Current Account function
//   const setCurrentAccount = (account) => {
//     dispatch({
//       type: "CONNECT_WALLET",
//       payload: account,
//     });

//     console.log(typeof account);
//   };

//   // Getting onchain balance
//   const setOnChainBalance = async (account) => {
//     const onChainBalance = await usdt.balanceOf(account);

//     const balance = onChainBalance.toString();
//     const visibleBalance = balance / state.decimals;

//     dispatch({
//       type: "GET_BALANCE",
//       payload: visibleBalance,
//     });

//     console.log(onChainBalance);
//     console.log(balance);
//     console.log(visibleBalance);
//     console.log(state);
//   };

//   // function that checks if wallet is connected
//   const checkIfWalletIsConnected = async () => {
//     try {
//       //if no wallet is found in browser it returns this
//       if (!ethereum) return alert("Please install metamask");

//       const accounts = await ethereum.request({
//         method: "eth_accounts",
//       });

//       console.log(accounts);

//       if (accounts.length) {
//         //getAllTransactions();
//         setCurrentAccount(accounts);
//       } else {
//         console.log("No accounts found");
//       }
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object.");
//     }
//   };

//   // function that connects the wallet
//   const connectWallet = async () => {
//     // }
//     try {
//       if (!ethereum) return alert("Please install metamask");

//       const accounts = await ethereum.request({
//         method: "eth_requestAccounts",
//       });

//       console.log(state.usdt, state.staking);

//       setCurrentAccount(accounts[0]);
//       setOnChainBalance(accounts[0]);
//       // const { currentAccount } = state;
//       console.log(state);
//     } catch (error) {
//       console.log(error);

//       throw new Error("No ethereum object");
//     }
//   };

//   useEffect(() => {
//     checkIfWalletIsConnected();
//     getStakingContract();
//     getUSDTContract();
//   }, []);

//   return (
//     <TransactionContext.Provider
//       value={{
//         currentAccount: state.currentAccount,
//         defaultRemainingTime,
//         setRemainingTime,
//         connectWallet,
//         workMinutes,
//         setWorkMinutes,
//         breakMinutes,
//         setBreakMinutes,
//         isPaused,
//         setIsPaused,
//         setOnChainBalance,
//       }}
//     >
//       {children}
//     </TransactionContext.Provider>
//   );
// };

/*

import React, { useState, useEffect, useReducer } from "react";
import { ethers } from "ethers";
import { BigNumber } from "ethers/lib/ethers";
import { add } from "date-fns";

import Web3 from "web3";
import Staking from "../BlockchainData/build/Staking.json";
import USDT from "../BlockchainData/build/IERC20.json";

import { useTicker } from "../hooks/useTicker";
import { getRemainingTimeUntilMsTimestamp } from "../utils/countdownTimer";

import { initialState } from "./transactionReducer";

export const TransactionContext = React.createContext(initialState);

const { ethereum } = window;

const contractAddress = "0xbF3aF2FA79ba903aCd7108D0A629B8CC9e33F4f8";
const USDTaddress = "0xdac17f958d2ee523a2206206994597c13d831ec7";

const getStakingContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    Staking.abi,
    signer
  );

  return transactionContract;
};
const provider = new ethers.providers.Web3Provider(ethereum);

const getUSDTContract = () => {
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    USDTaddress,
    USDT.abi,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  //state for current user account

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

  //Trying new timer function 08/08/22
  const [workMinutes, setWorkMinutes] = useState(60);
  const [breakMinutes, setBreakMinutes] = useState(60);

  const [isPaused, setIsPaused] = useState(false);

  //////////
  const staking = getStakingContract();
  const usdt = getUSDTContract();
  // let currentAccount;

  // const initialState = {
  //   currentAccount: "",
  //   onChainBalance: "",
  //   staking,
  //   usdt,
  //   decimals: 1000000,
  // };

  const blockchainReducer = (state, action) => {
    switch (action.type) {
      case "CONNECT_WALLET":
        return {
          ...state,
          currentAccount: (state.currentAccount = action.payload),
        };

      case "GET_BALANCE":
        console.log(action.payload);
        return {
          ...state,
          onChainBalance: (state.onChainBalance = action.payload),
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(blockchainReducer, initialState);

  // Set Current Account function
  const setCurrentAccount = (account) => {
    dispatch({
      type: "CONNECT_WALLET",
      payload: account,
    });

    console.log(typeof account);
  };

  // Getting onchain balance
  const setOnChainBalance = async (account) => {
    const onChainBalance = await usdt.balanceOf(account);

    const balance = onChainBalance.toString();
    const visibleBalance = balance / state.decimals;

    dispatch({
      type: "GET_BALANCE",
      payload: visibleBalance,
    });

    console.log(onChainBalance);
    console.log(balance);
    console.log(visibleBalance);
    console.log(state);
  };

  // function that checks if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      //if no wallet is found in browser it returns this
      if (!ethereum) return alert("Please install an ethereum wallet");

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      console.log(accounts);

      if (accounts.length) {
        //getAllTransactions();
        setCurrentAccount(accounts);
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
    // }
    try {

     

      //if no wallet is found in browser it returns this
      if (!ethereum) return alert("Please install an ethereum wallet");


      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log(state.usdt, state.staking);

      setCurrentAccount(accounts[0]);
      setOnChainBalance(accounts[0]);
      // const { currentAccount } = state;
      console.log(state);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getStakingContract();
    getUSDTContract();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        currentAccount: state.currentAccount,
        defaultRemainingTime,
        setRemainingTime,
        connectWallet,
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
        isPaused,
        setIsPaused,
        setOnChainBalance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
*/
