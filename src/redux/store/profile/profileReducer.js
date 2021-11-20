import { PROFILE, PROFILE_FAILURE, PROFILE_REQUEST } from './profileType.js';

const initState = {
  loading: false,
  profile: [],
};
export const storeProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE:
      return {
        ...state,
        loading: false,
        profile: action.payload,
      };

    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
