const INITIAL_STATE = {
  mode: "work",
};
const modeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_MODE":
      return {
        ...state,
        mode: action.payload,
      };

    default:
      return state;
  }
};

export default modeReducer;
