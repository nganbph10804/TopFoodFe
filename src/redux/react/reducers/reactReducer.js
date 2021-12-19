import {
  COMMENT_LIST,
  REACT_FAILURE,
  REACT_REQUEST,
  REPLY_LIST,
} from '../types/reactTypes.js';

const initState = {
  loading: false,
  comment: [],
  reply: [],
};

export const reactReducer = (state = initState, action) => {
  switch (action.type) {
    case REACT_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case REACT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_LIST:
      return {
        ...state,
        loading: false,
        comment: action.payload,
      };
    case REPLY_LIST:
      return {
        ...state,
        loading: false,
        reply: action.payload,
      };

    default:
      return state;
  }
};
