import { REACT_FAILURE, REACT_REQUEST } from '../types/reactTypes.js';

const initState = {
  loading: false,
};

export const reactReducer = (state = initState, action) => {
  switch (action.type) {
    case REACT_FAILURE:
      return {
        ...state,
        loading: true,
      };
    case REACT_REQUEST:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
