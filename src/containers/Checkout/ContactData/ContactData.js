import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';

// HELPERS
import { checkValidity, updateObject } from '../../../utils';

// COMPONENTS
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

// ACTIONS TO DISPATCH
import * as actions from '../../../store/actions';

// STYLES
import classes from './ContactData.module.scss';

class ContactData extends PureComponent {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
        valueType: 'Full Name',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        valueType: 'Street',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip Code',
        },
        value: '',
        valueType: 'Zip Code',
        validation: {
          required: true,
          minLength: 5, // PH Based: 4
          maxLength: 5,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'City',
        },
        value: '',
        valueType: 'City',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        valueType: 'Country',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your E-Mail',
        },
        value: '',
        valueType: 'Email Address',
        validation: {
          isEmail: true,
          required: true,
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
          ],
        },
        value: 'cheapest',
        validation: {}, // set to empty, so checking validity won't get undefined
        valid: true, // set to true cause options value is declared already, so checking formIsValid won't get undefined
      },
    },
    formIsValid: false,
  };

  // INFO: Two-way data binding means that every change to the state is immediately propagated to the view (and vice-versa).

  // TODO -- Handle Order Form --
  orderHandler = e => {
    e.preventDefault(); // Stop the from from submitting
    const { orderForm } = this.state;
    const { ingredients, totalPrice, onOrderBurger, userId } = this.props;

    const formData = {};

    // TODO - Define properties in formData
    /* eslint-disable-next-line */
    for (const formElementIdentifier in orderForm) {
      // TODO - set the value of the property equal to the value the user entered to state
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients,
      totalPrice,
      orderData: formData,
      userId,
    };

    // TODO - Pass Order
    onOrderBurger(order, userId);
  };

  // TODO -- Handle Input onChange --
  inputChangeHandler = (event, inputIdentifier) => {
    const { orderForm } = this.state;

    // TODO - update element
    const updatedOrderFormElement = updateObject(orderForm[inputIdentifier], {
      // TODO - set to event target value
      value: event.target.value,
      // TODO - first check if it is valid
      valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
      // TODO - set touch to true if user types
      touched: true,
    });

    // TODO - update orderForm
    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedOrderFormElement,
    });

    let formIsValid = true; // set to true in general
    // TODO - check all inputs for their validity for button ORDER clickable state
    /* eslint-disable-next-line */
    for (const inputIdentifier in updatedOrderForm) {
      // LOGIC:
      // FIRST CHECK: If element is valid and formIsValid as is = true, thus if it is false then the formIsValid will be mutated to false
      // NEXT CHECK: If element is valid but previous formIsValid was false then all will be overridden to false, so on and so forth..
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    console.log('[ContactData] OrderForm: ', updatedOrderForm, 'formIsValid: ', formIsValid);
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  };

  render() {
    const { orderForm, formIsValid } = this.state;
    const { loading } = this.props;

    const formElementsArray = [];

    // TODO - structure orderForm with id & config for formElementArray. P.S you can use reduce for this but let's try for in.
    /* eslint-disable-next-line */
    for (const key in orderForm) {
      formElementsArray.push({
        id: key, // name, zipCode, email, etc...
        config: orderForm[key], // name, zipCode, email Configs etc...
      });
    }

    let form = (
      <Fragment>
        <ul>
          {formElementsArray.map(({ id, config }) => (
            <li key={id}>{config.value}</li>
          ))}
        </ul>
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(({ id, config }, index) => (
            <Input
              key={id}
              position={index}
              elementType={config.elementType}
              elementConfig={config.elementConfig}
              value={config.value}
              valueType={config.valueType}
              invalid={!config.valid} // if not valid set to true, vice-versa
              shouldValidate={config.validation}
              touched={config.touched}
              changed={event => this.inputChangeHandler(event, id)}
            />
          ))}
          <Button btnType="Success" disabled={!formIsValid}>
            ORDER
          </Button>
        </form>
      </Fragment>
    );

    if (loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  loading: state.order.loading,
  userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, userId) => dispatch(actions.purchaseBurger(orderData, userId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactData);
