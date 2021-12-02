import { COMMENT_FAILURE, COMMENT_REQUEST } from '../types/commentType.js';

const initState = {
  loading: false,
};

export const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
