import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGOUT,
  GET_OTP,
  GET_OTP_FAILED,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILED,
} from '../types/authType';

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
    case FORGOT_REQUEST:
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
    case GET_OTP:
    case FORGOT_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_FAILED:
    case REGISTER_FAILED:
    case GET_OTP_FAILED:
    case FORGOT_FAILED:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case LOGOUT:
      return {
        accounts: [],
        profile: [],
        token: null,
        message: null,
      };

    default:
      return state;
  }
};
