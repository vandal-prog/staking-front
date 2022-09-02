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

export const setOnChainBalance = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // const USDTaddress = "0xFab46E002BbF0b4509813474841E0716E6730136";

  const USDTaddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

  return async (dispatch, getState) => {
    const usdt = new ethers.Contract(USDTaddress, USDT.abi, signer);
    const decimals = getState().data.decimals;
    const account = getState().account.currentAccount;
    const onChainBalance = await usdt.balanceOf(account);

    const balance = onChainBalance.toString();
    const visibleBalance = balance / decimals;

    dispatch({
      type: "SET_ONCHAIN_BALANCE",
      payload: visibleBalance,
    });
  };
};

export const hasStaked = () => {
  return async (dispatch, getState) => {
    const staking = getState().user.staking;
    const address = getState().account.currentAccount;
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
    const address = getState().account.currentAccount;
    const pledgedBool = await staking.hasPledged(address);

    dispatch({
      type: "SET_PLEGED",
      payload: pledgedBool,
    });
  };
};

export const setPledgedIncome = () => {
  return async (dispatch, getState) => {
    const decimals = getState().data.decimals;
    const staking = getState().user.staking;
    const address = getState().account.currentAccount;
    const Income = await staking.pledgeIncome(address);
    const pledgedIncome = Income.toString();
    const visiblePledgedIncome = pledgedIncome / decimals;

    dispatch({
      type: "SET_PLEGED_INCOME",
      payload: visiblePledgedIncome,
    });
  };
};

export const setPledgedBalance = () => {
  return async (dispatch, getState) => {
    const decimals = getState().data.decimals;
    const staking = getState().user.staking;
    const address = getState().account.currentAccount;
    const pledgedBalance = await staking.pledgedBalance(address);
    const pledgedBal = pledgedBalance.toString();
    const visiblePledgedBal = pledgedBal / decimals;

    dispatch({
      type: "SET_PLEGED_BALANCE",
      payload: visiblePledgedBal,
    });
  };
};

export const setCumulatedPledgeIncome = () => {
  return async (dispatch, getState) => {
    const decimals = getState().data.decimals;
    const staking = getState().user.staking;
    const address = getState().account.currentAccount;
    const cumulatedPledgedIncome = await staking.cumulatedPledgeIncome(address);
    const cumPledgedIncome = cumulatedPledgedIncome.toString();
    const visiblecumPledgedIncome = cumPledgedIncome / decimals;

    dispatch({
      type: "SET_CUMULATED_PLEDGE_INCOME",
      payload: visiblecumPledgedIncome,
    });
  };
};

export const setCumulatedPledgeBalance = () => {
  return async (dispatch, getState) => {
    const decimals = getState().data.decimals;
    const staking = getState().user.staking;
    const address = getState().account.currentAccount;
    const cumPledgedBalance = await staking.cumulatedPledgeBalance(address);
    const cumPledgedBal = cumPledgedBalance.toString();
    const visiblecumPledgedBal = cumPledgedBal / decimals;

    dispatch({
      type: "SET_CUMULATED_PLEDGE_BALANCE",
      payload: visiblecumPledgedBal,
    });
  };
};

export const setHourlyIncome = () => {
  return async (dispatch, getState) => {
    const decimals = getState().data.decimals;
    const staking = getState().user.staking;
    const address = getState().account.currentAccount;
    const hourlyIncomes = await staking.hourlyIncome(address);
    const hourlyIncome = hourlyIncomes.toString();
    const visiblehourlyIncome = hourlyIncome / decimals;

    dispatch({
      type: "SET_HOURLY_INCOME",
      payload: visiblehourlyIncome,
    });
  };
};

export const setPercentage = (percent) => ({
  type: "SET_PERCENTAGE",
  payload: percent,
});

export const setRate = (percent) => ({
  type: "SET_RATE",
  payload: percent,
});

export const setMode = (mode) => ({
  type: "SET_MODE",
  payload: mode,
});

export const setSecondsLeft = (seconds) => ({
  type: "SET_SECONDS_LEFT",
  payload: seconds,
});

//
export const setReferralAddress = (address) => ({
  type: "SET_CURRENT_REFFERAL",
  payload: address,
});

export const setReferralLink = (link) => ({
  type: "SET_REFFERAL_LINK",
  payload: link,
});
//
export const setPledgeRecords = () => {
  return async (dispatch, getState) => {
    const staking = getState().user.staking;
    const address = getState().account.currentAccount;
    const pledgeRecords = await staking.pledgeHistory(address);

    dispatch({
      type: "SET_PLEDGE_RECORDS",
      payload: pledgeRecords,
    });
  };
};

export const setStakeRecords = (record) => ({
  type: "SET_STAKE_RECORDS",
  payload: record,
});

export const setAccountBalance = (balance) => ({
  type: "SET_ACCOUNT_BALANCE",
  payload: balance,
});

export const setTodayIncome = (hourlyIncome) => ({
  type: "SET_TODAY_INCOME",
  payload: hourlyIncome,
});

export const resetTodayIncome = () => ({
  type: "RESET_TODAY_INCOME",
});

export const setCumulativeIncome = (hourlyIncome) => ({
  type: "SET_CUMMULATIVE_INCOME",
  payload: hourlyIncome,
});

export const setDays = (days) => ({
  type: "SET_DAYS",
  payload: days,
});

export const logout = () => ({
  type: "LOGOUT_USER",
});
//

export const setDayTime = (days) => ({
  type: "SET_TIME_D",
  payload: days,
});

export const setHourTime = (hour) => ({
  type: "SET_TIME_H",
  payload: hour,
});

export const setMinuteTime = (minute) => ({
  type: "SET_TIME_M",
  payload: minute,
});

export const setSecondsTime = (seconds) => ({
  type: "SET_TIME_S",
  payload: seconds,
});
