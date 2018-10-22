import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-order';

import classes from './ContactData.css';

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
          minLength: 4,
          maxLength: 4,
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
    loading: false,
  }

  // -- Handle Order onChange --
  orderHandler = (e) => {
    e.preventDefault();
    const { ingredients, price, history } = this.props;
    const { orderForm } = this.state;

    this.setState(prevState => ({ loading: true }));

    const formData = {};

    for (let formElementIdentifier in orderForm) {
      // set the value of the property equal to the value the user entered to state
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    // temporary order
    const order = {
      ingredients,
      price,
      orderData: formData
    };

    // endpoint to use in firebase should be .json
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  // -- Handle Input Validation --
  checkValidity(value, rules)  {
    let isValid = true;

    // if no validation rules are defined, return true for validity result
    if(!rules) {
      return true;
    }

    // check if rules has a required rule
    if (rules.required) {
      // set to true if not empty & isValid, otherwise false if empty
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      // set to true if length value is greater than or equal to rule min length & isValid, otherwise false if not met
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      // set to true if length value is less than or equal to rule max length & isValid, otherwise false if not met
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  // -- Handle Input onChange --
  inputChangeHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;

    // clone orderForm
    const updatedOrderForm = {
      ...orderForm
    }

    // clone element
    const updatedOrderFormElement = {
      ...updatedOrderForm[inputIdentifier]
    }

    // set to event target value
    updatedOrderFormElement.value = event.target.value;
    // first check if it is valid
    updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
    // set touch to true if user types
    updatedOrderFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedOrderFormElement;

    let formIsValid = true;
    // check al inputs for their validity for Button ORDER
    for (let inputIdentifiers in updatedOrderForm) {
      // check if this given element valid and formIsValid in general true = true
      formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid;
    }

    console.log('[ContactData] OrderForm: ', updatedOrderForm, 'formIsValid: ', formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid })
  };

  render() {
    const { loading, orderForm, formIsValid } = this.state;

    const formElementArray = [];

    // structure orderForm with id & config for formElementArray
    for (let key in orderForm) {
      formElementArray.push({
        id: key, // name, zipCode, email, etc...
        config: orderForm[key] // name, zipCode, email Configs etc...
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map(({ id, config }) => (
          <Input
            key={id}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            valueType={config.valueType}
            invalid={!config.valid}
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

export default ContactData;