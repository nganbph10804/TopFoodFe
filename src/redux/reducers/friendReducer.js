import { LOGOUT } from '../types/authType.js';
import {
  BLOCK_LIST,
  CLEAR_SEARCH,
  FRIEND_FAILURE,
  FRIEND_LIST,
  FRIEND_REQUEST,
  GET_PROFILE,
  LIST_REQUEST,
  SEARCH_FRIEND,
} from '../types/friendType.js';
export const friendReducer = (
  state = {
    profile: [], //profile detail
    search: [], // list search
    request: [], //list invalidations
    friend: [], //list friends
    block: [], //list block
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case FRIEND_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case SEARCH_FRIEND:
      return {
        ...state,
        loading: false,
        search: action.payload,
      };
    case FRIEND_LIST:
      return {
        ...state,
        loading: false,
        friend: action.payload,
      };
    case LIST_REQUEST:
      return {
        ...state,
        loading: false,
        request: action.payload,
      };
    case BLOCK_LIST:
      return {
        ...state,
        loading: false,
        block: action.payload,
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        loading: false,
        search: [],
      };
    case FRIEND_FAILURE:
      return {
        ...state,
        loading: false,
      };

    case LOGOUT:
      return {
        loading: false,
        profile: [], //profile detail
        search: [], // list search
        request: [], //list invalidations
        friend: [], //list friends
        block: [], //list block
      };
    default:
      return state;
  }
};
