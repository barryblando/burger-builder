import React from 'react';

import classes from './Burger.module.scss';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const renderBurger = ingredients => {
  // TODO - Turn ingredients object into an array of property keys using Object.keys
  // TODO - Access & turn ingredient key quantity/value into an array of undefined spaces using spread-ed Array Method
  // - and then map over on each of it (quantity length) using only the index and then return ingredient
  // - e.g Salad: 2, Bacon: 2 -- [0, 1].map((_, i) => i) // ? [[0, 1], [0, 1], ...]
  // - flatten these arrays using reduce to pull out values of these inner arrays
  // TODO - Return flattened array of elements. React can render this kind of syntax
  // - [<BI type="salad" />, <BI type="salad" />, <BI type="bacon" />, <BI type="bacon" />] : [0, 1, 0, 1]
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => [...Array(ingredients[igKey])].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />)) /* eslint-disable-line */
    .reduce((arr, el) => [...arr, ...el], []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p className={classes.Burger__message}>Please start adding ingredients!</p>;
  }

  console.log('[Burger] Transformed Ingredients: ', transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

// Burger: Debug Mode
const burger = ({ ingredients }) => console.log('[Burger] Ingredients: ', ingredients) || renderBurger(ingredients);

export default burger;
