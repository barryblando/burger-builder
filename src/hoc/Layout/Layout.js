import React, { Component, Fragment } from 'react'

// A common pattern in React is for a component to return multiple elements. To fix:
// (Old Way) create an HOC Aux (self-eradicating component) to wrap adjacent elements
// (New Way) by Instantiating Fragment wrapping the children elements/components
// Fragments let you group a list of children without adding extra nodes to the DOM (i.e div hell)
// import Aux from '../../hoc/Aux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// css modules
import classes from './Layout.module.scss';

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const { showSideDrawer } = this.state;
    const { children } = this.props;

    return (
      <Fragment>
        <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {children}
        </main>
      </Fragment>
    );
  }
}


export default Layout;