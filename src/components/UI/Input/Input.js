import React from 'react';

import classes from './Input.module.scss';

const input = props => {
  let inputElement = null;
  let validationError = null;

  const inputClasses = [classes.InputElement];

  // TODO set Invalid class to inputs if invalid, shouldValidate, touched conditions are true. Exceptions for drop down.
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  // TODO insert validation error if invalid, touched conditions are met
  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
  }

  switch(props.elementType) {
    case ('input'):
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        />
      break;
    case ('textarea'):
      inputElement = <textarea
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
        onChange={props.changed}
        />
      break;
    case ('select'):
      inputElement = (
        <select
          className={inputClasses}
          value={props.value}
          onChange={props.changed}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
    break;
    default:
      inputElement = <input
        className={classes.InputElement}
        {...props.elementConfig}
        value={props.value}
          onChange={props.changed}
        />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;