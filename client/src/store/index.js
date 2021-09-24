import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import * as actions from './actions';

const initialState = {};
const composeEnhancers =
  (process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;
const middleware = [thunk];

export { actions };

export default createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);
