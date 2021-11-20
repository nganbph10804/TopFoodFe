import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers/authReducer.js';
import { commentReducer } from './comment/reducers/commentReducer.js';
import { favoriteReducer } from './favorite/favoriteReducer.js';
import { fileReducer } from './file/reducers/fileReducer.js';
import { followReducer } from './follow/followReducer.js';
import { friendReducer } from './friend/reducers/friendReducer.js';
import { reactReducer } from './react/reducers/reactReducer.js';
import { feedReducer } from './store/feed/reducers/feedReducer.js';
import { foodReducer } from './store/food/reducers/foodReducer.js';
import { storeProfileReducer } from './store/profile/profileReducer.js';
import { tagReducer } from './store/tag/reducer/tagReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  friend: friendReducer,
  file: fileReducer,
  tag: tagReducer,
  food: foodReducer,
  feed: feedReducer,
  comment: commentReducer,
  react: reactReducer,
  favorite: favoriteReducer,
  follow: followReducer,
  storeProfile: storeProfileReducer,
});

export default rootReducer;
