import {
  TAG_FAILURE,
  SEARCH_TAG,
  TAG_REQUEST,
  GET_TAG_ID,
} from '../type/tagType.js';

const initState = {
  loading: false,
  tag: [],
  detail: [],
};
export const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_TAG:
      return {
        ...state,
        loading: false,
        tag: action.payload,
      };
    case GET_TAG_ID:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    case TAG_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
