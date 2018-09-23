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
export const purchaseBurger = orderData => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    // endpoint to use in firebase should be .json
    axios
      .post("/orders.json", orderData)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // dispatch(push('/')) update if connected react router configured
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
export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then(res => {
        const rawData = res.data || {};
        console.log("[Orders] rawData: ", rawData);
        console.log("Object Keys/Order Id's: ", Object.keys(rawData));
        // TODO - turn orders json object into an array of object
        const fetchedOrders = Object.keys(rawData).reduce((prevData, id) => {
          // push order
          prevData.push({ id, ...rawData[id] });
          return prevData;
        }, []);
        console.log(fetchedOrders);
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
    };
};
