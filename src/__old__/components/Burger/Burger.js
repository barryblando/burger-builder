import React from 'react';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const renderBurger = ingredients => {
  // turn ingredients into an array of strings using Object.keys
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      // Turn ingredient quantity into an array of undefined spaces using Array Method, spread it
      // and then map over on each of it (quantity length) using only the index of map & return
      // [undefined, undefined].map((_, i) => i) // ? [0, 1]
      return [...Array(ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ));
    })
    .reduce((arr, el) => {
      // console.log('Arr: ', arr);
      // console.log('El: ', el);
      return [...arr, ...el];
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p className={classes.Burger__message}>Please start adding ingredients!</p>;
  }

  // console.log(transformedIngredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
}

// Burger: Debug Mode
const burger = ({ ingredients }) => console.log('[Burger] Ingredients: ', ingredients) || renderBurger(ingredients);


export default burger;