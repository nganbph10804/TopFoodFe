import {
  FILE_DONE,
  FILE_ERR,
  FILE_REQ,
  MULTI_FILE,
  CLEAR_FILE,
} from '../types/fileType.js';

const initState = {
  loading: false,
  file: '',
  files: [],
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
        file: action.payload,
      };
    case FILE_ERR:
      return {
        ...state,
        loading: false,
      };
    case MULTI_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
        loading: false,
      };
    case CLEAR_FILE:
      return {
        ...state,
        files: [],
      };
    default:
      return state;
  }
};
