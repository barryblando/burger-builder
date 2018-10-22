import React, { Component, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

  checkoutCancelledHandler = () => {
    const { history } = this.props;
    history.goBack();
  };

  checkoutContinuedHandler = () => {
    const { history } = this.props;
    // TODO - replace url & render Contact Data form
    history.replace('/checkout/contact-data');
  };

  render() {
    const { match, ingredients, purchased } = this.props;

    // Redirect to homepage if user refresh checkout page 'cause refreshing page clears state and ingredients would be null
    let summary = <Redirect to="/" />;

    if (ingredients) {
      // if ContactData purchase's success & purchased state set to true, then redirect to homepage
      summary = (
        <Fragment>
          { purchased && <Redirect to="/"/> }
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={ingredients}/>
          {/* create relative path, loading this component doesn't re-render whole Checkout page */}
          <Route path={match.path + '/contact-data'} component={ContactData}/>
        </Fragment>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(mapStateToProps)(Checkout);