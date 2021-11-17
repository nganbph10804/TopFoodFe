import {
  HEART_LIST,
  REACT_FAILURE,
  REACT_REQUEST,
} from '../types/reactTypes.js';

const initState = {
  loading: false,
  heart: [],
  total: null,
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
    case HEART_LIST:
      return {
        ...state,
        loading: false,
        heart: action.payload.data,
        total: action.payload.totalElements,
      };

    default:
      return state;
  }
};
