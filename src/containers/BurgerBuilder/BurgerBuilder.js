import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-order';

import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    // purchaseable: false,
    purchasing: false,
    error: false,
  };

  // componentDidMount triggered after execution of the componentWillMount -> render from HOC withErrorHandler
  componentDidMount() {
    console.log(this.props);
    this.props.initIngredients();
  }

  // TODO -- Handle 'order now' availability state, other way to use componentDidUpdate but performance issues --
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // set true or false if condition is met or not
    return sum > 0;
  }

  // TODO -- Handle displaying modal when 'order now' clicked
  purchaseHandler = () => {
    // INFO: arrow function don't have a 'this' so they always lexically inherit 'this' from their enclosing scope (e.g BurgerBuilder)
    // if didn't find 'this' from enclosing scope it will lexically search where enclosing scope delegates/link to,
    // in this class which is React.Component and that is where setState lives.
    this.setState({ purchasing: true });
  }

  // TODO -- Handle close modal if backdrop clicked --
  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  // TODO -- Handle Order summary 'continue' clicked
  purchaseContinueHandler = () => {
    const { history, onInitPurchased } = this.props;
    // PROBLEM: Checkout componentWillMount is too late when executing onInit, it doesn't prevent the rendering with old props by redux
    // SOLUTION: set purchased state to false before continuing to checkout page so we won't get redirected back to homepage
    onInitPurchased();
    // What history.push does is it pushes a new entry onto the history stack - aka redirecting the user to another route.
    history.push('/checkout');
  }

  render() {
    const { purchasing } = this.state;
    const {
      ingredients,
      totalPrice,
      error,
      onIngredientAdded,
      onIngredientRemoved
    } = this.props;

    const disabledInfo = {
      ...ingredients,
    };

    // TODO - mutate ingredients value to boolean and then pass it down to BuildControls, will be disabled by type
    for (let key in disabledInfo) {
      // TODO - check if true then disable the specific ingredient button, e.g { salad: true, meat: false, etc. }
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

    // TODO - if ingredients are all set, then...
    if (ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={ingredients} />
          <BuildControls
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            purchaseable={this.updatePurchaseState(ingredients)}
            ordered={this.purchaseHandler}
            price={totalPrice}
          />
        </Fragment>
      );
      orderSummary = <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />;
    }

    return (
      <Fragment>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initIngredients: () => dispatch(actions.initIngredients()),
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitPurchased: () => dispatch(actions.purchaseInit())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));