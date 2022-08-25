const INITIAL_STATE = {
  staked: true,
  pledged: true,
};

const boolReducer = (state = INITIAL_STATE, action) => {
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

    default:
      return state;
  }
};

export default boolReducer;