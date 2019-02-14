import { put, call } from 'redux-saga/effects';

import axios from '../../axios-order';
import * as actions from '../actions';

export function* purchaseBurgerSaga({ token, orderData }) {
  yield put(actions.purchaseBurgerStart());
  // INFO: endpoint to use in firebase REST API should be .json
  try {
    const { data } = yield call(axios.post, `/orders.json?auth=${token}`, orderData);
    // TODO destructure response.data.name and reassign it as id
    const { name: id } = data || {};
    // TODO dispatch purchaseBurgerSuccess to store for state updates and re-render views
    yield put(actions.purchaseBurgerSuccess(id, orderData));
    // !!TODO: dispatch(push('/')) update if connected react router configured
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ token, userId }) {
  yield put(actions.fetchOrdersStart());
  // fetch only orders by userId, and set indexOn array searchable to "userId" on firebase database rules
  const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
  // pass token to authorize / use getState to get token & pass it
  try {
    const { data } = yield call(axios.get, `/orders.json${queryParams}`);
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
