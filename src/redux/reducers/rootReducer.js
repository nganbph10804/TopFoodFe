import { combineReducers } from 'redux';
import { foodReducer } from '../store/food/reducers/foodReducer.js';
import { tagReducer } from '../store/tag/reducer/tagReducer.js';
import { authReducer } from './authReducer.js';
import { fileReducer } from './fileReducer.js';
import { friendReducer } from './friendReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  friend: friendReducer,
  file: fileReducer,
  tag: tagReducer,
  food: foodReducer,
});

export default rootReducer;
