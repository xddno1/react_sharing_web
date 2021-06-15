import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { admintoken } from "./reducers/admintoken";
import { usertoken } from "./reducers/usertoken";

const persistConfig = {
  key: "root",
  storage,
};
const allreducsers = combineReducers({ admintoken, usertoken });

const persistedReducer = persistReducer(persistConfig, allreducsers);
// eslint-disable-next-line
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};
