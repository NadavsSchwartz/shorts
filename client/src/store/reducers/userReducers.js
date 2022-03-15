import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_STATS_FAIL,
  USER_STATS_REQUEST,
  USER_STATS_SUCCESS,
} from '../actions/userActions';

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userStatsReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case USER_STATS_REQUEST:
      return { ...state, loading: true };
    case USER_STATS_SUCCESS:
      return { loading: false, stats: action.payload };
    case USER_STATS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
