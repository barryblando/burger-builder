import { takeEvery, all, fork } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga
} from './auth';
import { initIngredientsSaga  } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

// Set Listeners
export function* watchAuth() {
  // TODO listen to actions given
  // takeEvery will listen to certain actions and do something when they occur
  // yields of takeEvery executes right after each other
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_INITIAL_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder() {
  yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}

export function* rootSaga() {
  yield all([
    fork(watchAuth),
    fork(watchBurgerBuilder),
    fork(watchOrder)
  ]);
}