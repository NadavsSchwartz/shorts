import axios from 'axios';

export const DELETE_LINK_REQUEST = 'DELETE_LINK_REQUEST';
export const DELETE_LINK_SUCCESS = 'DELETE_LINK_SUCCESS';
export const DELETE_LINK_FAIL = 'DELETE_LINK_FAIL';

export const deleteShortLink = (selectedLinksToDelete) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_LINK_REQUEST,
    });

    const { data } = await axios.delete('http://localhost:4000/url', {
      withCredentials: true,
      data: { shortUrl: selectedLinksToDelete },
    });

    dispatch({
      type: DELETE_LINK_SUCCESS,
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
      type: DELETE_LINK_FAIL,
      payload: message,
    });
  }
};

export const CREATE_LINK_REQUEST = 'CREATE_LINK_REQUEST';
export const CREATE_LINK_SUCCESS = 'CREATE_LINK_SUCCESS';
export const CREATE_LINK_FAIL = 'CREATE_LINK_FAIL';

export const createShortLink = (longUrlToShorten) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_LINK_REQUEST,
    });

    const { data } = await axios.post(
      'http://localhost:4000/url',
      {
        longUrl: longUrlToShorten,
      },
      { withCredentials: true },
    );

    dispatch({
      type: CREATE_LINK_SUCCESS,
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
      type: CREATE_LINK_FAIL,
      payload: message,
    });
  }
};
