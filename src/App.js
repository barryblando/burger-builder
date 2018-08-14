import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

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
      <div>
        <Layout>
          <BurgerBuilder builder="Test: Receive Props"/>
        </Layout>
      </div>
    );
  }
}

export default App;
