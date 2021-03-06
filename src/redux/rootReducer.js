import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers/authReducer.js';
import { commentReducer } from './comment/reducers/commentReducer.js';
import { favoriteReducer } from './favorite/favoriteReducer.js';
import { feedReducer } from './feed/feedReducer.js';
import { fileReducer } from './file/reducers/fileReducer.js';
import { followReducer } from './follow/followReducer.js';
import { hotReducer } from './foodHot/foodHotReducer.js';
import { friendReducer } from './friend/reducers/friendReducer.js';
import { newFeedReducer } from './newFeed/newFeedReducer.js';
import { postReducer } from './post/postReducer.js';
import { reactReducer } from './react/reducers/reactReducer.js';
import { searchPostReducer } from './searchPost/searchReducer.js';
import { foodReducer } from './store/food/reducers/foodReducer.js';
import { storeProfileReducer } from './store/profile/profileReducer.js';
import { tagReducer } from './store/tag/reducer/tagReducer.js';
import { voteFoodReducer } from './vote/voteReducer.js';

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
  voteFood: voteFoodReducer,
  post: postReducer,
  hot: hotReducer,
  search: searchPostReducer,
  newFeed: newFeedReducer,
});

export default rootReducer;
