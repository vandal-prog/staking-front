import { combineReducers } from "redux";

import userReducer from "./user/user-reducer";
import dataReducer from "./user/data-reducer";
import boolReducer from "./user/bool-reducer";
import accountReducer from "./user/account-reducer";
import arrayReducer from "./user/array-reducer";

export default combineReducers({
  account: accountReducer,
  user: userReducer,
  data: dataReducer,
  boolean: boolReducer,
  array: arrayReducer,
});
