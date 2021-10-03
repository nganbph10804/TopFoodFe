import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
} from '../types/loginType';

export const authReducer = (
  state = {
    user: [],
    // token: localStorage.getItem('token'),
    loading: false,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        // token: action.payload.accessToken,
        loading: false,
      };
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      // localStorage.removeItem('token');
      return {
        users: [],
        token: null,
      };

    default:
      return state;
  }
};
