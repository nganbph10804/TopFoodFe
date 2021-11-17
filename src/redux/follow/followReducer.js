import { FOLLOW_FAILURE, FOLLOW_REQUEST } from './followType.js';

const initState = {
  loading: false,
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

    default:
      return state;
  }
};
