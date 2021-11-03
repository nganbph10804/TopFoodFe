import { TAG_FAILURE, TAG_LIST, TAG_REQUEST } from '../type/tagType.js';

const initState = {
  loading: false,
  tag: [],
};
export const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case TAG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TAG_LIST:
      return {
        ...state,
        loading: false,
        tag: action.payload,
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
