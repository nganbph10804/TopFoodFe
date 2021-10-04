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
    account: [],
    profile: [],
    token: null,
    message: null,
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
      return {
        ...state,
        account: action.payload.data.account,
        profile: action.payload.data.profile,
        token: action.payload.data.token,
        loading: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_FAILED:
    case REGISTER_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        accounts: [],
        token: null,
      };

    default:
      return state;
  }
};
