import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.scss';

const navigationItems = ({ isAuthenticated }) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>Burger Builder</NavigationItem>
    { isAuthenticated && <NavigationItem link="/orders" >Orders</NavigationItem> }
    { !isAuthenticated ?
      <NavigationItem link="/auth" >Authenticate</NavigationItem> : <NavigationItem link="/logout" >Logout</NavigationItem>
    }
  </ul>
);

export default navigationItems;