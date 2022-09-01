import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";
import storage from "redux-persist/lib/storage";

const middlewares = [logger, thunk];

const persistConfig = {
  key: "user",
  storage,
  // whitelist: ["account", "user", "boolean", "data", "array"],
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);

export default { store, persistor };
