import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import dataReducer from "./user/data-reducer";
// import truthReducer from "./user/bool-reducer";
import accountReducer from "./user/account-reducer";

export default combineReducers({
  account: accountReducer,
  user: userReducer,
  data: dataReducer,
});
