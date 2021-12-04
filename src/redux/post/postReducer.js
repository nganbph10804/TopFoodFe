import {
  POST_DETAIL,
  POST_FAILURE,
  POST_LIST,
  POST_LIST_BY_CITY,
  POST_REQUEST,
} from './postType.js';

const initState = {
  loading: false,
  post: [],
  detail: [],
  city: [],
};
export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case POST_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case POST_LIST:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case POST_LIST_BY_CITY:
      return {
        ...state,
        loading: false,
        city: action.payload,
      };
    case POST_DETAIL:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    default:
      return state;
  }
};
