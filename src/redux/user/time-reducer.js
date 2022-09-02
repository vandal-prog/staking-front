const INITIAL_STATE = {
  workMinutes: 60,
  breakMinutes: 60,
  secondsLeft: 0,
  d: 0,
  h: 0,
  m: 0,
  s: 0,
};

const timeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SECONDS_LEFT":
      return {
        ...state,
        secondsLeft: action.payload,
      };

    case "SET_TIME_D":
      return {
        ...state,
        d: action.payload,
      };

    case "SET_TIME_H":
      return {
        ...state,
        h: action.payload,
      };

    case "SET_TIME_M":
      return {
        ...state,
        m: action.payload,
      };

    case "SET_TIME_S":
      return {
        ...state,
        s: action.payload,
      };

    default:
      return state;
  }
};

export default timeReducer;
