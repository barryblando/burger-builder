import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Spinner from './components/UI/Spinner/Spinner';
import Logout from './containers/Auth/Logout/Logout';

/* eslint-disable-next-line */
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

// LEGACY component, replaced w/ Suspense and Lazy
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

// Containers Component
import Layout from './hoc/Layout/Layout';
import PrivateRoute from './routers/PrivateRoute';
import * as actions from './store/actions/index';

// Lazy Load - Client Side, if you do Server Side use React-Loadable
const AsyncCheckout = lazy(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = lazy(() => import('./containers/Orders/Orders'));
const AsyncAuth = lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  componentDidMount() {
    // every time App mounted check auth state
    const { onTryAutoSignUp } = this.props;
    onTryAutoSignUp();
  }

  render() {
    // PARTIAL INFO: Redirect to / if can't find page that users are looking for
    // LATER TODO: Redirect to 404 page

    return (
      <Layout>
        {/* {routes} */}
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route exact path="/" component={BurgerBuilder} />
            <Route path="/auth" component={AsyncAuth} />
            <PrivateRoute path="/checkout" component={AsyncCheckout} />
            <PrivateRoute path="/orders" component={AsyncOrders} />
            <PrivateRoute path="/logout" component={Logout} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onTryAutoSignUp: () => dispatch(actions.authCheckState()),
});

// wrapped connect w/ withRouter to enforce props being passed down to App component & to prevent routing from breaking
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
