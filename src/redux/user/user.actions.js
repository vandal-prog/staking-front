import USDT from "../../BlockchainData/build/IERC20.json";
import { ethers } from "ethers";

export const setCurrentAccount = (account) => ({
  type: "SET_CURRENT_ACCOUNT",
  payload: account,
});

export const setStakingContract = (contract) => ({
  type: "SET_STAKING_CONTRACT",
  payload: contract,
});

export const setUSDTContract = (contract) => ({
  type: "SET_USDT_CONTRACT",
  payload: contract,
});

export const setOnChainBalance = (account) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const USDTaddress = "0xfab46e002bbf0b4509813474841e0716e6730136";
  const usdtContract = new ethers.Contract(USDTaddress, USDT.abi, signer);

  return async (dispatch, getState) => {
    // const getOnChainBalance = async (account) => {
    const usdt = new ethers.Contract(USDTaddress, USDT.abi, signer);
    const decimals = getState().user.decimals;
    const onChainBalance = await usdt.balanceOf(account);

    const balance = onChainBalance.toString();
    const visibleBalance = balance / decimals;

    //   console.log(onChainBalance);
    //   console.log(balance);
    //   console.log(visibleBalance);
    //   return visibleBalance;
    // };
    dispatch({
      type: "SET_ONCHAIN_BALANCE",
      payload: visibleBalance,
    });
  };
};

export const hasStaked = () => {
  return async (dispatch, getState) => {
    const staking = getState().user.staking;
    const address = getState().user.currentAccount;
    const stakedBool = await staking.hasStaked(address);

    dispatch({
      type: "SET_STAKED",
      payload: stakedBool,
    });
  };
};

export const hasPledged = () => {
  return async (dispatch, getState) => {
    const staking = getState().user.staking;
    const address = getState().user.currentAccount;
    const pledgedBool = await staking.hasPledged(address);

    dispatch({
      type: "SET_PLEGED",
      payload: pledgedBool,
    });
  };
};
