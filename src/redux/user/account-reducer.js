const INITIAL_STATE = {
  currentAccount: null,
};

const accountReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_ACCOUNT":
      return {
        ...state,
        currentAccount: action.payload,
      };

    default:
      return state;
  }
};

export default accountReducer;
