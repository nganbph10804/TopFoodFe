import {
  FOLLOW_FAILURE,
  LIST_USER_FOLLOW_STORE,
  FOLLOW_LIST_STORE,
  FOLLOW_REQUEST,
} from './followType.js';

const initState = {
  loading: false,
  listUserFollowStore: [],
  followListStore: [],
};
export const followReducer = (state = initState, action) => {
  switch (action.type) {
    case FOLLOW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FOLLOW_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case FOLLOW_LIST_STORE:
      return {
        ...state,
        loading: false,
        followListStore: action.payload,
      };
    case LIST_USER_FOLLOW_STORE:
      return {
        ...state,
        loading: false,
        listUserFollowStore: action.payload,
      };

    default:
      return state;
  }
};
