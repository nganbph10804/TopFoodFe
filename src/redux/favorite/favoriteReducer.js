import {
  FAVORITE_FAILURE,
  FAVORITE_LIST,
  FAVORITE_REQUEST,
} from './favoriteType.js';

const initState = {
  loading: false,
  favorite: [],
  total: null,
};

export const favoriteReducer = (state = initState, action) => {
  switch (action.type) {
    case FAVORITE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAVORITE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case FAVORITE_LIST:
      return {
        ...state,
        loading: false,
        favorite: action.payload.data,
        total: action.payload.totalElements,
      };

    default:
      return state;
  }
};
