import React from 'react'

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = ({ price, ingredientAdded, ingredientRemoved, disabled, purchaseable, ordered }) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{price.toFixed(2)}</strong></p>
    {/* passing ctrl.type in BuildControl as prop causes unnecessary loop, to prevent that
      from happening just omit it & put listener on added prop to just return everything back up */}
    {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => ingredientAdded(ctrl.type)}
          removed={() => ingredientRemoved(ctrl.type)}
          disabled={disabled[ctrl.type]}
        />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!purchaseable}
      onClick={ordered}>ORDER NOW</button>
  </div>
);

export default buildControls;