const INITIAL_STATE = {
  ReferralAddress: null,
  ReferralLink: null, 
};

const referralReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_REFFERAL":
      return {
        ...state,
        ReferralAddress: action.payload,
      };

      case "SET_REFFERAL_LINK":
        return {
          ...state,
          ReferralLink: action.payload,
        };

    default:
      return state;
  }
};

export default referralReducer;
