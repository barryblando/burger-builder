import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/index';

/**
 * INFO: don't use null in order state for now.
 * PROBLEM: when Order container gets mounted and in render execution it uses a .map or any declarative built-in methods, it gets TypeError
 * WHY: componentDidMount gets invoked immediately after a component is mounted (inserted into the tree). Initialization of orders are too late.
 * TEMP FIX: just use empty data i.e [] / {} 'cause we don't have error state to handle error response.
 */

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state, action) => updateObject(state, { purchased: false });
const purchaseBurgerStart = (state, action) => updateObject(state, { purchased: true });
const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  const updateOrder = updateObject(state, {
    loading: false,
    purchased: true,
    orders: [...state.orders, newOrder],
  });
  return updateObject(state, updateOrder);
};
const purchaseBurgerFail = (state, action) => updateObject(state, { loading: false });

const fetchOrdersStart = (state, action) => updateObject(state, { loading: true });
const fetchOrdersSuccess = (state, action) =>
  updateObject(state, {
    orders: action.orders,
    loading: false,
  });
const fetchOrdersFail = (state, action) => updateObject(state, { loading: false });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state, action);
    default:
      return state;
  }
};

export default reducer;
