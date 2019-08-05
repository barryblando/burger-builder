import { takeEvery, takeLatest, all, fork } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, authUserSaga, authCheckStateSaga, authNetworkSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

// SAGAS will handle side effects thus make action creators more clean and leaner

// SET LISTENERS
export function* watchAuth() {
  // TODO listen to actions given
  // takeEvery will listen to certain actions and does something when they occur
  // yields of takeEvery executes right after each other
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_NETWORK, authNetworkSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  // takeLatest Spawns a saga on each action dispatched to the Store that matches pattern.
  // And automatically cancels any previous saga task started if it's still running.
  yield all([
    takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga),
    takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga),
  ]);
}

export function* rootSaga() {
  yield all([fork(watchAuth), fork(watchBurgerBuilder), fork(watchOrder)]);
}
