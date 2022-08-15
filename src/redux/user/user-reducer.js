const INITIAL_STATE = {
  currentAccount: null,
  staking: {},
  usdt: {},
  onChainBalance: 1,
  decimals: 1000000,
  staked: true,
  pledged: true,
  pledgeRecords: [],
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
    default:
      return state;
  }
};

export default userReducer;
