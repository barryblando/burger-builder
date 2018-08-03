import React from 'react';

import classes from './Burger.css';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ({ ingredients }) => {
  // turn ingredients into an array of strings using Object.keys
  let transformedIngredients = Object.keys(ingredients)
    .map(igKey => {
      //  map over on each ingredient key quantity & return
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
};

export default burger;