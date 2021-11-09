import {
  TAG_FAILURE,
  SEARCH_TAG,
  TAG_REQUEST,
  GET_TAG_ID,
} from '../type/tagType.js';

const initState = {
  loading: false,
  tag: [],
  details: [],
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
      const { foodId, datas } = action.payload;
      return {
        ...state,
        loading: false,
        details: datas.filter(i => i.id !== foodId),
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
