import { put, call } from 'redux-saga/effects';

import reduxSagaFirebase from '../../config/firebaseConfig';
import * as actions from '../actions';

export function* purchaseBurgerSaga({ orderData, userId }) {
  // yield put(actions.purchaseBurgerStart());
  try {
    const id = yield call(reduxSagaFirebase.database.create, `users/${userId}/orders`, orderData);
    // TODO dispatch purchaseBurgerSuccess to store for state updates and re-render views
    yield put(actions.purchaseBurgerSuccess(id, orderData));
    // !!TODO: dispatch(push('/')) update if connected react router configured
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ userId }) {
  yield put(actions.fetchOrdersStart());
  try {
    const data = yield call(reduxSagaFirebase.database.read, `users/${userId}/orders`);
    const rawData = data || {};
    console.log('[Orders] rawData: ', rawData);
    console.log("[Orders] Object Keys as Order Id's: ", Object.keys(rawData));
    // TODO - turn fetched json object into an array of object
    const fetchedOrders = Object.keys(rawData).reduce((prevData, id) => {
      prevData.push({ id, ...rawData[id] });
      return prevData;
    }, []);
    console.log('[Orders] Fetched Orders: ', fetchedOrders);
    // TODO dispatch fetchOrdersSuccess to redux store for state updates and re-render views
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
