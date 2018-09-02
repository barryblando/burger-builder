import React, { Fragment } from 'react'

import Button from '../../UI/Button/Button';

import classes from './OrderSummary.css';

const orderSummary = props =>{
  const { ingredients, price, purchaseCanceled, purchaseContinued } = props;

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
      <div className={classes.OrderCenter}>
        <Button
          btnType="Danger"
          clicked={purchaseCanceled}>CANCEL</Button>
        <Button
          btnType="Success"
          clicked={purchaseContinued}>CONTINUE</Button>
      </div>
    </Fragment>
  );
};

export default orderSummary;