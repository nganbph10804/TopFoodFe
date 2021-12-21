import { FAILURE, FOLLOW, LIKE, REQUEST } from './newFeedType';

const initState = {
  loading: false,
  like: [],
  follower: [],
};

export const newFeedReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAILURE:
      return {
        ...state,
        loading: false,
      };
    case LIKE:
      return {
        ...state,
        loading: false,
        like: action.payload,
      };
    case FOLLOW:
      return {
        ...state,
        loading: false,
        follower: action.payload,
      };

    default:
      return state;
  }
};
