import { actionTypes } from '../../constants';

const initialState = {
  countries: [],
};

const country = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.country.READ_SUCCESS:
      return {
        ...state,
        countries: payload,
      };

    case actionTypes.country.READ_FAILURE:
    default:
      return state;
  }
};

export default country;
