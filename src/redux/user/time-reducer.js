const INITIAL_STATE = {
  workMinutes: 60,
  breakMinutes: 60,
  secondsLeft: 0,
};

const timeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SECONDS_LEFT":
      return {
        ...state,
        secondsLeft: action.payload,
      };

    default:
      return state;
  }
};

export default timeReducer;
