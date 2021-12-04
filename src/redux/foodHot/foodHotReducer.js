import { FAILURE, HOT_LIST, REQUEST } from './foodHotType.js';

const initState = {
  loading: false,
  hot: [],
};

export const hotReducer = (state = initState, action) => {
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
    case HOT_LIST:
      return {
        ...state,
        loading: false,
        hot: action.payload,
      };

    default:
      return state;
  }
};
