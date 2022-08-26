const INITIAL_STATE = {
  staking: {},
  usdt: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
