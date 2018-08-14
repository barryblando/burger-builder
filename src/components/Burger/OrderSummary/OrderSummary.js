import React, { Fragment, Component } from 'react'

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  // Temporary, change back to stateless functional component
  UNSAFE_componentWillUpdate() {
    console.log('[OrderSummary] willUpdate');
  }

  render() {
    const { ingredients, price, purchaseCanceled, purchaseContinued } = this.props;

    const ingredientSummary = Object.keys(ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
          </li>
        );
      });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients: </p>
        <u>
          {ingredientSummary}
        </u>
        <p><strong>Total Price: {price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType="Danger"
          clicked={purchaseCanceled}>CANCEL</Button>
        <Button
          btnType="Success"
          clicked={purchaseContinued}>CONTINUE</Button>
      </Fragment>
    );
  }
};

export default OrderSummary;