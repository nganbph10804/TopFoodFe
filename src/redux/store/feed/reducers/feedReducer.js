import {
  DELETE_FEED,
  FEED_DETAIL,
  FEED_FAILURE,
  FEED_LIST,
  FEED_REQUEST,
  SEARCH_FEED,
} from '../types/feedType.js';

const initState = {
  loading: false,
  feed: [],
  detail: [],
  search: [],
};
export const feedReducer = (state = initState, action) => {
  switch (action.type) {
    case FEED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FEED_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case FEED_LIST:
      return {
        ...state,
        loading: false,
        feed: action.payload,
      };
    case FEED_DETAIL:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    case DELETE_FEED:
      return {
        ...state,
        loading: false,
        feed: state.feed.filter(i => i.id !== action.payload),
      };
    case SEARCH_FEED:
      return {
        ...state,
        loading: false,
        search: action.payload,
      };
    default:
      return state;
  }
};
