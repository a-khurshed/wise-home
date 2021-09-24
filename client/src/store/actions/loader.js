import { actionTypes } from '../../constants';

export const addAction = (action) => (dispatch) =>
  dispatch({
    type: actionTypes.loader.ADD_ACTION,
    payload: action,
  });

export const removeAction = (action) => (dispatch) =>
  dispatch({
    type: actionTypes.loader.REMOVE_ACTION,
    payload: action,
  });
