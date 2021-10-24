import { combineReducers } from "redux";
import { authReducer } from "./authReducer.js";
import { friendReducer } from "./friendReducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  friend: friendReducer,
});

export default rootReducer;
