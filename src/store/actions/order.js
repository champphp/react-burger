import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchasBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  };
};

export const purchasBurgerFail = error => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  };
};

export const purchasBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  };
};

export const purchasBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchasBurgerStart());
    axios
      .post(`/orders.json?auth=${token}`, orderData)
      .then(response => {
        dispatch(purchasBurgerSuccess(response.data.name, orderData));
      })
      .catch(error => {
        dispatch(purchasBurgerFail(error));
      });
  };
};

export const purchasInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  };
};

export const fetchOrdersSuccess = orders => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  };
};

export const fetchOrdersFail = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  };
};

export const fetchOrderStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrderStart())
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    axios
      .get(`/orders.json${queryParams}`)
      .then(res => {
        const arrOrder = [];
        for (let key in res.data) {
          arrOrder.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersSuccess(arrOrder))
      })
      .catch(error => {
        dispatch(fetchOrdersFail(error))
      });
  };
};
