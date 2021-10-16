import {
  FRIEND_LIST,
  GET_PROFILE,
  LIST_REQUEST,
  SEARCH_FRIEND,
} from "../types/friendType.js";
import { LOGOUT, REQUEST } from "../types/authType.js";

export const friendReducer = (
  state = {
    profile: [], //profile detail
    search: [], // list search
    request: [], //list invalidations
    friend: [], //list friends
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case SEARCH_FRIEND:
      return {
        ...state,
        search: action.payload,
        loading: false,
      };
    case FRIEND_LIST:
      return {
        ...state,
        friend: action.payload,
        loading: false,
      };
    case LIST_REQUEST:
      return {
        ...state,
        request: action.payload,
        loading: false,
      };

    case LOGOUT:
      return {
        profile: [], //profile detail
        search: [], // list search
        request: [], //list invalidations
        friend: [], //list friends
      };
    default:
      return state;
  }
};
