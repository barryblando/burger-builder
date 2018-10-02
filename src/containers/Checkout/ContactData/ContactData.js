import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-order';

import * as actions from '../../../store/actions/index';

import classes from './ContactData.module.scss';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        valueType: 'Full Name',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        valueType: 'Street',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: '',
        valueType: 'Zip Code',
        validation: {
          required: true,
          minLength: 5, // PH Based: 4
          maxLength: 5,
          isNumeric: true
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City'
        },
        value: '',
        valueType: 'City',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        valueType: 'Country',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        valueType: 'Email Address',
        validation: {
          isEmail: true,
          required: true
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
            { value: 'dine-in', displayValue: 'Dine-In' },
          ]
        },
        value: 'cheapest',
        validation: {}, // set to empty, so checking validity won't get undefined
        valid: true, // set to true cause options value is declared already, so checking formIsValid won't get undefined
      },
    },
    formIsValid: false,
  }

  // TODO -- Handle Order Form --
  orderHandler = (e) => {
    e.preventDefault();
    const { ingredients, totalPrice, onOrderBurger } = this.props;
    const { orderForm } = this.state;

    const formData = {};

    // TODO - Define properties in formData
    for (let formElementIdentifier in orderForm) {
      // TODO - set the value of the property equal to the value the user entered to state
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients,
      totalPrice,
      orderData: formData
    };

    // TODO - Pass Order
    onOrderBurger(order);
  };

  // TODO -- Handle Input Validation --
  checkValidity(value, rules)  {
    let isValid = true;

    // TODO - if no validation rules are defined, return true for validity result
    if(!rules) {
      return true;
    }

    // TODO - check if rules has a required rule
    if (rules.required) {
      // TODO - set to true if not empty & isValid, otherwise false if empty
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      // TODO - set to true if length value is greater than or equal to rule min length & isValid, otherwise false if not met
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      // TODO - set to true if length value is less than or equal to rule max length & isValid, otherwise false if not met
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
  }

  // TODO -- Handle Input onChange --
  inputChangeHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;

    // TODO - clone orderForm
    const updatedOrderForm = {
      ...orderForm
    }

    // TODO - clone element
    const updatedOrderFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }

    // TODO - set to event target value
    updatedOrderFormElement.value = event.target.value;

    // TODO - first check if it is valid
    updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);

    // TODO - set touch to true if user types
    updatedOrderFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

    let formIsValid = true; // set to true in general
    // TODO - check all inputs for their validity for Button ORDER
    for (let inputIdentifiers in updatedOrderForm) {
      // TODO - check if this given element is valid and formIsValid as is = true, thus if element is false then the formIsValid will be false
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }

    console.log('[ContactData] OrderForm: ', updatedOrderForm, 'formIsValid: ', formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid })
  };

  render() {
    const { orderForm, formIsValid } = this.state;
    const { loading } = this.props;

    const formElementsArray = [];

    // TODO - structure orderForm with id & config for formElementArray
    for (let key in orderForm) {
      formElementsArray.push({
        id: key, // name, zipCode, email, etc...
        config: orderForm[key] // name, zipCode, email Configs etc...
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            valueType={config.valueType}
            invalid={!config.valid} // if not valid set to true, vice-versa
            shouldValidate={config.validation}
            touched={config.touched}
            changed={(event) => this.inputChangeHandler(event, id)}
            />
        ))}
        <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
      </form>
    );

    if (loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));