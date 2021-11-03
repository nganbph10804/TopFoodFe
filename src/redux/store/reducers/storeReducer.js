import {
  DELETE_FOOD,
  FOOD_DETAIL,
  FOOD_LIST,
  STORE_FAILURE,
  STORE_REQUEST,
  UPDATE_FOOD,
} from '../types/storeType.js';

const initState = {
  loading: false,
  food: [],
  detail: [],
};

export const storeReducer = (state = initState, action) => {
  switch (action.type) {
    case STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STORE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case FOOD_LIST:
      return {
        ...state,
        loading: false,
        food: action.payload,
      };
    case DELETE_FOOD:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };

    default:
      return state;
  }
};
