import { STORE_FAILURE, STORE_REQUEST, TAG_LIST } from '../types/storeType.js';

const initState = {
  loading: false,
  tag: [],
};
export const tagReducer = (state = initState, action) => {
  switch (action.type) {
    case STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TAG_LIST:
      return {
        ...state,
        loading: false,
        tag: action.payload,
      };
    case STORE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
