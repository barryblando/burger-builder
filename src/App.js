import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  // Test if withErrorHandler willUnMount works
  // state = {
  //   show: true,
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }

  render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            {/* <Route path="/" render={() => <h1>HOME</h1>} exact /> */}
            {/* <Route path="/burger-builder" component={BurgerBuilder} /> */}
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
          {/* <BurgerBuilder builder="Test: Receive Props"/> */}
        </Layout>
      </Fragment>
    );
  }
}

export default App;
