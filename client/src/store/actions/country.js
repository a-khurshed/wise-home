import axios from 'axios';

import { actionTypes } from '../../constants';

export const read = (region) => async (dispatch) => {
  try {
    dispatch({
      type: actionTypes.loader.ADD_ACTION,
      payload: actionTypes.country.READ,
    });

    const res = await axios.get(`/api/v1/countries?region=${region}`);

    dispatch({
      type: actionTypes.country.READ_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.country.READ_FAILURE,
    });

    throw error.response.data;
  } finally {
    dispatch({
      type: actionTypes.loader.REMOVE_ACTION,
      payload: actionTypes.country.READ,
    });
  }
};
