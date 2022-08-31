import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import dataReducer from "./user/data-reducer";
import boolReducer from "./user/bool-reducer";
import accountReducer from "./user/account-reducer";
import timeReducer from "./user/time-reducer";
import modeReducer from "./user/mode-reducer";
import referralReducer from "./user/referral-reducer";

export default combineReducers({
  account: accountReducer,
  user: userReducer,
  data: dataReducer,
  boolean: boolReducer,
  timer: timeReducer,
  mode: modeReducer,
  referral: referralReducer,
});
