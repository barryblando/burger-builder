import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  // decode & set state encoded URI before rendering components to avoid ingredients null error
  constructor(props) {
    super(props);
    // console.log('[Checkout] Constructor Props: ', props);
    const { location } = props;
    const query = new URLSearchParams(location.search)
    const ingredients = {};
    let price = 0;
    // loop through query params using for of
    for (let param of query.entries()) {
      // check if param[0] is price
      if (param[0] === 'price') {
        price = param[1];
      } else {
        // ['salad', '1'], add them as property to empty ingredients object
        ingredients[param[0]] = +param[1]
      }
    }

    this.state = {
      ingredients,
      price
    }
  }

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    // replace url & render Contact Data form
    history.replace('/checkout/contact-data');
  };

  render() {
    const { match } = this.props;
    const { ingredients, price } = this.state;

    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
          ingredients={ingredients}/>
        {/* create relative path, loading this component doesn't re-render whole Checkout page */}
        <Route
          path={match.path + '/contact-data'}
          render={(props) => (<ContactData ingredients={ingredients} price={price} {...props} />)}/>
      </div>
    );
  }
}

export default Checkout;