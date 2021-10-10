import { LOGIN_SUCCESS, LOGOUT } from '../types/authType';

export const authReducer = (
  state = {
    account: [],
    profile: [],
    token: null,
    message: null,
    loading: false,
    error: [],
  },
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        account: action.payload.data.account,
        profile: action.payload.data.profile,
        token: action.payload.data.token,
        loading: false,
      };
    case LOGOUT:
      return {
        ...state,
        account: [],
        profile: [],
        token: null,
        message: null,
        loading: false,
        error: [],
      };

    default:
      return state;
  }
};
