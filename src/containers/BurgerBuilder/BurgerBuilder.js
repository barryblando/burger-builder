import React, { Component } from 'react';

import Aux from '../../hoc/Aux';

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

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      // check if true then disable the specific ingredient button, i.e { salad: true, meat: false, etc. }
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;