import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent';

// Containers Component
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

class App extends Component {

  componentDidMount() {
    // every time App mounted check auth state
    this.props.onTryAutoSignUp();
  }

  render() {
    const { isAuthenticated } = this.props;

    // PARTIAL INFO: Redirect to / if can't find page that users are looking for
    // LATER TODO: Redirect to 404 page
    let routes = (
      <Switch>
        <Route path="/" component={BurgerBuilder} exact />
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/" />
      </Switch>
    );

    if (isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" component={BurgerBuilder} exact />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Fragment>
        <Layout>
          {/* <Route path="/" render={() => <h1>HOME</h1>} exact /> */}
          {routes}
        </Layout>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

// wrapped connect w/ withRouter to enforce props being passed down to App component & to prevent routing from breaking
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

