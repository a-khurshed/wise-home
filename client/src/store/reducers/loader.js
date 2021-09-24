import { actionTypes } from '../../constants';

const initialState = {
  actions: [],
};

const loader = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.loader.ADD_ACTION:
      return {
        ...state,
        actions: [...state.actions, payload],
      };

    case actionTypes.loader.REMOVE_ACTION:
      return {
        ...state,
        actions: state.actions.filter((action) => action !== payload),
      };

    default:
      return state;
  }
};

export default loader;
