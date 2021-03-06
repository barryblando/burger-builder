import React, { Component, Fragment } from 'react';

import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.scss';

// INFO: https://reactjs.org/docs/render-props.html
// This is a render prop component - normally it would have life-cycle methods that fetch data and store loading or error states
class ControlsRenderProp extends Component {
  render() {
    const { children } = this.props;
    const controls = [
      { label: 'Salad', type: 'salad' },
      { label: 'Bacon', type: 'bacon' },
      { label: 'Cheese', type: 'cheese' },
      { label: 'Meat', type: 'meat' },
    ];
    return children(controls);
  }
}

const buildControls = props => {
  const { price, ingredientAdded, ingredientRemoved, disabled, purchaseable, ordered, isAuth } = props;

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price.toFixed(2)}</strong>
      </p>
      <ControlsRenderProp>
        {controls => {
          if (!controls) return <p>Can't Load Controllers!</p>;

          return (
            <Fragment>
              {/* put listener on added & removed prop to just return everything back upstream or pass ctrl.type in BuildControl as prop */}
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
                type="button"
                className={classes.OrderButton}
                disabled={!purchaseable} // if not/false purchaseable then flip it to true so it will set button to disabled
                onClick={ordered}
              >
                {isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
              </button>
            </Fragment>
          );
        }}
      </ControlsRenderProp>
    </div>
  );
};

export default buildControls;
