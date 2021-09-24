import { combineReducers } from 'redux';

import country from './country';
import loader from './loader';

export default combineReducers({
  country,
  loader,
});
