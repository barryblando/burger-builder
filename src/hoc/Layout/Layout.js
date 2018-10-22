import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// A common pattern in React is for a component to return multiple elements. To fix:
// (Old Way) create an HOC Aux (self-eradicating component) to wrap adjacent elements
// (New Way) by Instantiating Fragment wrapping the children elements/components
// Fragments let you group a list of children without adding extra nodes to the DOM (i.e div hell)

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
    const { children, isAuthenticated } = this.props;

    return (
      <Fragment>
        <Toolbar
          isAuth={isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={isAuthenticated}
          open={showSideDrawer}
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
          {children}
        </main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

export default connect(mapStateToProps)(Layout);