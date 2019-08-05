import React, { Component, createRef } from 'react';

import classes from './Input.module.scss';

class Input extends Component {
  textInput = createRef();

  componentDidMount() {
    this.focus();
  }

  focus = () => {
    const { position } = this.props;
    if (position === 0) this.textInput.current.focus();
  };

  render() {
    let inputElement = null;
    let validationError = null;
    const {
      invalid,
      shouldValidate,
      touched,
      elementType,
      elementConfig,
      changed,
      value,
      label,
      valueType,
    } = this.props;

    const inputClasses = [classes.InputElement];

    // TODO set Invalid class to inputs if invalid, shouldValidate, touched conditions are true. Exceptions for drop down.
    if (invalid && shouldValidate && touched) {
      inputClasses.push(classes.Invalid);
    }

    // TODO insert validation error if invalid, touched conditions are met
    if (invalid && touched) {
      validationError = <p className={classes.ValidationError}>Please enter a valid {valueType}</p>;
    }

    switch (elementType) {
      case 'input':
        inputElement = (
          <input
            className={inputClasses.join(' ')}
            {...elementConfig}
            value={value}
            ref={this.textInput}
            onChange={changed}
          />
        );
        break;
      case 'textarea':
        inputElement = (
          <textarea className={classes.InputElement} {...elementConfig} value={value} onChange={changed} />
        );
        break;
      case 'select':
        inputElement = (
          <select className={inputClasses} value={value} onChange={changed}>
            {elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        );
        break;
      default:
        inputElement = <input className={classes.InputElement} {...elementConfig} value={value} onChange={changed} />;
    }

    /* eslint-disable */
    return (
      <div className={classes.Input}>
        <label className={classes.Label}>{label}</label>
        {inputElement}
        {validationError}
      </div>
    );
  }
}

export default Input;
