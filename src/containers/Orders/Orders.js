import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Orders.module.scss';

import * as actions from '../../store/actions/index';

class Orders extends PureComponent {
  state = {
    OrderIngredients: {},
  };

  // TODO -- fetch orders when this component gets mounted
  componentDidMount() {
    const { onFetchOrders, userId } = this.props;
    onFetchOrders(userId);
  }

  // TODO: try viewing Burger ingredients using Reconciliation/setState, without using Route
  viewBurger = id => {
    const { orders } = this.props;
    // TODO - find ordered ingredients using order id
    const { ingredients } = orders.find(order => order.id === id);
    // TODO De construct ingredients
    const { salad, bacon, cheese, meat } = ingredients;
    // Re order ingredients salad to meat
    const OrderIngredients = { salad, bacon, cheese, meat };
    this.setState({ OrderIngredients });
  };

  render() {
    const { OrderIngredients } = this.state;
    const { orders, loading } = this.props;

    let order = orders.map(({ id, ingredients, totalPrice }) => (
      <Order key={id} ingredients={ingredients} price={totalPrice} clicked={() => this.viewBurger(id)} />
    ));

    if (loading) {
      order = <Spinner />;
    }

    return (
      <div className={classes.Orders}>
        <div className={classes.Orders__List}>{order}</div>
        <div className={classes.Orders__BurgerView}>
          <Burger ingredients={OrderIngredients} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: userId => dispatch(actions.fetchOrders(userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
