import { combineReducers } from 'redux';
import { tagReducer } from '../store/reducers/tagReducer.js';
import { authReducer } from './authReducer.js';
import { fileReducer } from './fileReducer.js';
import { friendReducer } from './friendReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  friend: friendReducer,
  file: fileReducer,
  tag: tagReducer,
});

export default rootReducer;
