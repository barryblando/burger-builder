import axios from "../../axios-order";
import * as actionTypes from "./actionTypes";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData
  };
};

export const purchaseBurgerFail = error => ({ type: actionTypes.PURCHASE_BURGER_FAIL, error });
export const purchaseBurgerStart = () => ({ type: actionTypes.PURCHASE_BURGER_START });

// PURCHASE BURGER
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    // INFO: endpoint to use in firebase should be .json
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        // TODO turn response data name as data id
        const { data: { name: id } } = response;
        // TODO dispatch purchaseBurgerSuccess to store for state updates and re-render views
        dispatch(purchaseBurgerSuccess(id, orderData));
        // !!TODO dispatch(push('/')) update if connected react router configured
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error));
      });
  };
};

export const purchaseInit = () => ({ type: actionTypes.PURCHASE_INIT });

export const fetchOrdersSuccess = orders => ({ type: actionTypes.FETCH_ORDERS_SUCCESS, orders });
export const fetchOrdersFail = error => ({ type: actionTypes.FETCH_ORDERS_FAIL, error });
export const fetchOrdersStart = () => ({ type: actionTypes.FETCH_ORDERS_START });

// FETCH ORDERS
export const fetchOrders = token => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    // pass token to authorize / use getState to get token & pass it
    axios
      .get(`/orders.json?auth=${token}`)
      .then(res => {
        const rawData = res.data || {};
        console.log("[Orders] rawData: ", rawData);
        console.log("[Orders] Object Keys as Order Id's: ", Object.keys(rawData));
        // TODO - turn fetched json object into an array of object
        const fetchedOrders = Object.keys(rawData).reduce((prevData, id) => {
          prevData.push({ id, ...rawData[id] });
          return prevData;
        }, []);
        console.log("[Orders] Fetched Orders: ", fetchedOrders);
        // TODO dispatch fetchOrdersSuccess to redux store for state updates and re-render views
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
