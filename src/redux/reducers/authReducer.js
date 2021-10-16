import { LOGIN_SUCCESS, LOGOUT, EDIT_PROFILE } from '../types/authType';

export const authReducer = (
  state = {
    account: [],
    profile: [],
    token: null,
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
      };

    case EDIT_PROFILE:
      return {
        profile: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        account: [],
        profile: [],
        token: null,
      };

    default:
      return state;
  }
};
