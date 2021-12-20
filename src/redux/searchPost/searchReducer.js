import { ALL, FAILURE, REQUEST, SEARCH } from './searchType';

const initState = {
  loading: true,
  all: [],
  search: [],
};

export const searchPostReducer = (state = initState, action) => {
  switch (action.type) {
    case REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAILURE:
      return {
        ...state,
        loading: false,
      };
    case ALL:
      return {
        ...state,
        loading: false,
        all: action.payload,
      };
    case SEARCH:
      return {
        ...state,
        loading: false,
        search: state.all.filter(i =>
          i.profile.profile.name.toLowerCase().includes(action.payload)
        ),
      };

    default:
      return state;
  }
};
