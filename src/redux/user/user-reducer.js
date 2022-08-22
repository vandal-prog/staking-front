const INITIAL_STATE = {
  currentAccount: null,
  staking: {},
  usdt: {},
  onChainBalance: 1,
  decimals: 1000000,
  staked: true,
  pledged: true,
  pledgeRecords: [],
  stakingTime: null,
  pledgingTime: null,
  pledgeIncome: 0,
  pledgeBalance: 0,
  cumulatedPledgeIncome: 0,
  cumulatedPledgeBalance: 0,
  hourlyIncome: 0,
  ratePercent: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_ACCOUNT":
      return {
        ...state,
        currentAccount: action.payload,
      };

    case "SET_STAKING_CONTRACT":
      return {
        ...state,
        staking: action.payload,
      };

    case "SET_USDT_CONTRACT":
      return {
        ...state,
        usdt: action.payload,
      };

    case "SET_ONCHAIN_BALANCE":
      return {
        ...state,
        onChainBalance: action.payload,
      };

    case "SET_STAKED":
      return {
        ...state,
        staked: action.payload,
      };

    case "SET_PLEGED":
      return {
        ...state,
        pledged: action.payload,
      };

    case "SET_PLEGED_INCOME":
      return {
        ...state,
        pledged: action.payload,
      };

    case "SET_PLEGED_BALANCE":
      return {
        ...state,
        pledgeBalance: action.payload,
      };

    case "SET_CUMULATED_PLEDGE_INCOME":
      return {
        ...state,
        cumulatedPledgeIncome: action.payload,
      };

    case "SET_CUMULATED_PLEDGE_BALANCE":
      return {
        ...state,
        cumulatedPledgeBalance: action.payload,
      };

    case "SET_HOURLY_INCOME":
      return {
        ...state,
        hourlyIncome: action.payload,
      };

    case "SET_RATE":
      return {
        ...state,
        ratePercent: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
