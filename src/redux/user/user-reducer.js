const INITIAL_STATE = {
  staking: {},
  usdt: {},
  decimals: 1000000,
  staked: true,
  pledged: true,

  pledgeRecords: [],
  stakingTime: 0,
  pledgingTime: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default userReducer;
