import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers/authReducer.js';
import { fileReducer } from './file/reducers/fileReducer.js';
import { friendReducer } from './friend/reducers/friendReducer.js';
import { feedReducer } from './store/feed/reducers/feedReducer.js';
import { foodReducer } from './store/food/reducers/foodReducer.js';
import { tagReducer } from './store/tag/reducer/tagReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  friend: friendReducer,
  file: fileReducer,
  tag: tagReducer,
  food: foodReducer,
  feed: feedReducer,
});

export default rootReducer;
