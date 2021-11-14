import {
  LOGIN_SUCCESS,
  LOGOUT,
  EDIT_PROFILE,
  AUTH_REQUEST,
  AUTH_FAILURE,
  AUTH_DONE,
} from '../types/authType.js';

export const authReducer = (
  state = {
    loading: false,
    account: [],
    profile: [],
    token: null,
  },
  action
) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case AUTH_DONE: {
      return {
        ...state,
        loading: false,
      };
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload.data.account,
        profile: action.payload.data.profile,
        token: action.payload.data.token,
      };
    case EDIT_PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        account: [],
        profile: [],
        token: null,
      };

    default:
      return state;
  }
};
