import { UN_VOTE, VOTE_FAILURE, VOTE_FOOD, VOTE_REQUEST } from './voteType.js';

const initState = {
  loading: false,
};
export const voteFoodReducer = (state = initState, action) => {
  switch (action.type) {
    case VOTE_REQUEST:
      return {
        ...state,
        loading: false,
      };
    case VOTE_FOOD:
      return {
        ...state,
        loading: false,
      };
    case UN_VOTE:
      return {
        ...state,
        loading: false,
      };
    case VOTE_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
