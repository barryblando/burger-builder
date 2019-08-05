import React from 'react';

import Button from '../UI/Button/Button';

import classes from './Order.module.scss';

const order = ({ ingredients, price, clicked }) => {
  const ingredientsArr = [];

  // transform ingredients into Array Object
  /* eslint-disable-next-line */
  for (const ingredientName in ingredients) {
    ingredientsArr.push({
      name: ingredientName,
      amount: ingredients[ingredientName],
    });
  }

  // Output ingredient
  const ingredientOutput = ingredientsArr.map(ig => (
    <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px',
      }}
      key={ig.name}
    >
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>
        Ingredients: {ingredientOutput}{' '}
        <Button clicked={clicked} btnType="Success">
          View
        </Button>
      </p>
      <p>
        Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
