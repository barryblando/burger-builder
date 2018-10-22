import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

class Orders extends Component {

  // TODO -- fetch orders when this component gets mounted
  componentDidMount() {
    const { token, userId } = this.props;
    this.props.onFetchOrders(token, userId);
  }

  render() {
    const { orders, loading } = this.props;

    let order = (
      orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.totalPrice}
          />
      ))
    );

    if (loading) {
      order = <Spinner />
    }

    return (
      <div>
        {order}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));