import React from 'react'

import classes from './Order.css';

const order = ({ ingredients, price }) => {
  const ingredientsArr = [];

  // transform ingredients into Array Object
  for (let ingredientName in ingredients) {
    ingredientsArr.push(
      {
        name: ingredientName,
        amount: ingredients[ingredientName],
      }
    );
  }

  // Output ingredient
  const ingredientOutput = ingredientsArr.map(ig => {
    return (
      <span
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
        key={ig.name}>
          {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {Number.parseFloat(price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;