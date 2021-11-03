import {
  DELETE_FOOD,
  FOOD_DETAIL,
  FOOD_LIST,
  FOOD_FAILURE,
  FOOD_REQUEST,
  UPDATE_FOOD,
} from '../types/foodType.js';

const initState = {
  loading: false,
  food: [],
  detail: [],
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
        detail: state.food.filter(i => i.id !== action.payload),
      };
    case UPDATE_FOOD:
      const { id, data } = action.payload;
      return {
        ...state,
        loading: false,
        food: state.food.map(i => (i.id === id ? [...state.food, data] : i)),
      };

    default:
      return state;
  }
};
