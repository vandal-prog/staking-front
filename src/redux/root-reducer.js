import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user-reducer";
import dataReducer from "./user/data-reducer";
import boolReducer from "./user/bool-reducer";
import accountReducer from "./user/account-reducer";
import arrayReducer from "./user/array-reducer";

const appReducer = combineReducers({
  account: accountReducer,
  user: userReducer,
  data: dataReducer,
  boolean: boolReducer,
  array: arrayReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    storage.removeItem("persist:root");
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
