import { combineReducers } from 'redux';
import { authReducer } from './authReducer.js';
import { fileReducer } from './fileReducer.js';
import { friendReducer } from './friendReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  friend: friendReducer,
  file: fileReducer,
});

export default rootReducer;
