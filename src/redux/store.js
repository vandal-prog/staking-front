import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";
import storage from "redux-persist/lib/storage";

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const persistConfig = {
  key: "user",
  storage,

  whitelist: ["account", "boolean", "data", "array", "referral"],

  // whitelist: ["account", "user", "boolean", "data", "array"],
  //
  // whitelist: ["referral"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);

export default { store, persistor };
