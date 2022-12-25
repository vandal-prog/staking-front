const INITIAL_STATE = {
  onChainBalance: 0,
  pledgeIncome: 0,
  pledgeBalance: 0,
  cumulatedPledgeIncome: 0,
  cumulatedPledgeBalance: 0,
  hourlyIncome: 0,
  ratePercent: 0,
  days: 0,
  decimals: 1000000,
  stakingTime: 0,
  pledgingTime: 0,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ONCHAIN_BALANCE":
      return {
        ...state,
        onChainBalance: action.payload,
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

    case "SET_DAYS":
      return {
        ...state,
        days: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer;
