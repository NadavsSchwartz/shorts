import axios from 'axios';

export const USER_DETAILS_REQUEST = 'USER_DETAILS_REQUEST';
export const USER_DETAILS_SUCCESS = 'USER_DETAILS_SUCCESS';
export const USER_DETAILS_FAIL = 'USER_DETAILS_FAIL';
export const USER_DETAILS_RESET = 'USER_DETAILS_RESET';

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(`http://localhost:4000/me`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      console.log(error);
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const USER_STATS_REQUEST = 'USER_STATS_REQUEST';
export const USER_STATS_SUCCESS = 'USER_STATS_SUCCESS';
export const USER_STATS_FAIL = 'USER_STATS_FAIL';

export const getUserStats = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_STATS_REQUEST,
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get(
      `http://localhost:4000/user/stats`,
      config,
    );

    dispatch({
      type: USER_STATS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Not authorized, token failed') {
      console.log(error);
    }
    dispatch({
      type: USER_STATS_FAIL,
      payload: message,
    });
  }
};
