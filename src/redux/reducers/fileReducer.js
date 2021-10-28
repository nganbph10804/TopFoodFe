import { FILE_DONE, FILE_ERR, FILE_REQ } from '../fileType.js';

const initState = {
  loading: false,
  file: [],
};
export const fileReducer = (state = initState, action) => {
  switch (action.type) {
    case FILE_REQ:
      return {
        ...state,
        loading: true,
      };
    case FILE_DONE:
      return {
        ...state,
        loading: false,
        file: [...state.file, action.payload],
      };
    case FILE_ERR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
