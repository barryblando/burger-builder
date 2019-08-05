import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

// import Sagas
import { rootSaga } from './sagas';

import rootReducer from './reducers/index';

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const loggerMiddleware = createLogger(); // to log prevState & nextState
const sagaMiddleware = createSagaMiddleware();

const configureStore = createStore(rootReducer, composeEnhancers(applyMiddleware(loggerMiddleware, sagaMiddleware)));

// run watchers and listen
sagaMiddleware.run(rootSaga);

export default configureStore;
