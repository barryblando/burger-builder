import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  };

  // -- Handle 'order now' availability state --
  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0)

    this.setState({ purchaseable: sum > 0 });
  }

  // -- Handle add ingredient --
  addIngredientHandler = type => {
    // Get old count of specific ingredient
    const oldCount = this.state.ingredients[type];
    // Add + 1
    const updatedCount = oldCount + 1;
    // Copy all current ingredients in immutable way
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    // Update specific ingredient w/ updatedCount
    updatedIngredients[type] = updatedCount;
    // Update price
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  // -- Handle remove ingredient --
  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    // remove ingredient safely when its 0 just return
    if (oldCount <= 0) {
      return;
    }
    // Subtract - 1
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  // -- Handle displaying modal when 'order now' clicked
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  // -- Handle close modal if backdrop clicked --
  purchaseCancelHandler = () => {
    this.setState(prevState => ({ purchasing: !prevState.purchasing }))
  }

  // -- Handle Order summary 'continue' clicked
  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const { ingredients, purchasing, totalPrice, purchaseable } = this.state;

    const disabledInfo = {
      ...ingredients,
    };

    // mutate ingredients value to boolean and then pass object down to BuildControls
    for (let key in disabledInfo) {
      // check if true then disable the specific ingredient button, i.e { salad: true, meat: false, etc. }
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Fragment>
        <Modal
          show={purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={purchaseable}
          ordered={this.purchaseHandler}
          price={totalPrice}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;