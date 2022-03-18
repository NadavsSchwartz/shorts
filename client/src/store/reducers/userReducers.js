import {
  CREATE_LINK_FAIL,
  CREATE_LINK_REQUEST,
  CREATE_LINK_SUCCESS,
  DELETE_LINK_FAIL,
  DELETE_LINK_REQUEST,
  DELETE_LINK_SUCCESS,
  RESET_ERROR_MESSAGE,
} from 'store/actions/shortLinkAcionts';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOG_OUT_FAIL,
  USER_LOG_OUT_REQUEST,
  USER_LOG_OUT_SUCCESS,
  USER_STATS_FAIL,
  USER_STATS_REQUEST,
  USER_STATS_SUCCESS,
} from '../actions/userActions';

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userStatsReducer = (
  state = { stats: {}, loading: false, error: null },
  action,
) => {
  switch (action.type) {
    case USER_STATS_REQUEST:
      return { ...state, loading: true };
    case USER_STATS_SUCCESS:
      return { ...state, loading: false, stats: action.payload };
    case USER_STATS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOG_OUT_REQUEST:
      return { ...state, loading: true };
    case USER_LOG_OUT_SUCCESS:
      return { ...state, loading: false, stats: {} };
    case USER_LOG_OUT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_LINK_REQUEST:
      return { ...state, loading: true };
    case CREATE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };
    case CREATE_LINK_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_LINK_REQUEST:
      return { ...state, loading: true };
    case DELETE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        stats: action.payload,
      };
    case DELETE_LINK_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESET_ERROR_MESSAGE:
      return { ...state, loading: false, error: null };
    default:
      return state;
  }
};
