import {
  DELETE_FOOD,
  FOOD_DETAIL,
  FOOD_LIST,
  FOOD_FAILURE,
  FOOD_REQUEST,
  UPDATE_FOOD,
  FILTER_FOOD,
  SEARCH_FOOD,
} from '../types/foodType.js';

const initState = {
  loading: false,
  food: [],
  detail: [],
  search: [],
  filter: [],
};

export const foodReducer = (state = initState, action) => {
  switch (action.type) {
    case FOOD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FOOD_FAILURE:
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
    case FOOD_DETAIL:
      return {
        ...state,
        loading: false,
        detail: action.payload,
      };
    case DELETE_FOOD:
      return {
        ...state,
        loading: false,
        food: state.food.filter(i => i.id !== action.payload),
      };
    case FILTER_FOOD:
      return {
        ...state,
        loading: false,
        filter: action.payload,
      };
    case SEARCH_FOOD:
      return {
        ...state,
        loading: false,
        search: state.food.filter(i =>
          i.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };

    default:
      return state;
  }
};
