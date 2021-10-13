import {
  FRIEND_LIST,
  GET_PROFILE,
  LIST_REQUEST,
  SEARCH_FRIEND,
} from '../types/friendType.js';

export const friendReducer = (
  state = {
    profile: [],
    search: [],
    request: [],
    friend: [],
  },
  action
) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        profile: action.payload,
      };
    case SEARCH_FRIEND:
      return {
        search: action.payload,
      };
    case FRIEND_LIST:
      return {
        friend: action.payload,
      };
    case LIST_REQUEST:
      return {
        request: action.payload,
      };

    default:
      return state;
  }
};
