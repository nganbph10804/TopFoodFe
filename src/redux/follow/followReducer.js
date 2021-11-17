import {
  FOLLOW_FAILURE,
  FOLLOW_LIST,
  FOLLOW_LIST_STORE,
  FOLLOW_REQUEST,
} from './followType.js';

const initState = {
  loading: false,
  userFollow: [],
  storeFollow: [],
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
        storeFollow: action.payload,
      };
    case FOLLOW_LIST:
      return {
        ...state,
        loading: false,
        userFollow: action.payload,
      };

    default:
      return state;
  }
};
