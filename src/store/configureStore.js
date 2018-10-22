import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loggerMiddleware = createLogger(); // to log prevState & nextState

const configureStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(loggerMiddleware, thunkMiddleware))
  );

export default configureStore;