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
  return async (dispatch, getState) => {
    // const getOnChainBalance = async (account) => {
    const usdt = getState().user.usdt;
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
