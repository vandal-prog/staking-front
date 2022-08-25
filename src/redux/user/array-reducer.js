const INITIAL_STATE = {
  pledgeRecords: [],
  accountBalance: [],
  todayIncome: [],
  cummulativeIncome: [],
};

const arrayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PLEDGE_RECORDS":
      return {
        ...state,
        pledgeRecords: action.payload,
      };

    case "SET_ACCOUNT_BALANCE":
      return {
        ...state,
        accountBalance: [...state.accountBalance, action.payload],
      };

    case "SET_TODAY_INCOME":
      return {
        ...state,
        todayIncome: [...state.todayIncome, action.payload],
      };

    case "RESET_TODAY_INCOME":
      return {
        ...state,
        todayIncome: [],
      };

    case "SET_CUMMULATIVE_INCOME":
      return {
        ...state,
        cummulativeIncome: [...state.cummulativeIncome, action.payload],
      };

    default:
      return state;
  }
};

export default arrayReducer;
