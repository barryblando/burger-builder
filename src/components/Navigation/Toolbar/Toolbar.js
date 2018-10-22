import React from 'react'

import Logo from '../../Logo/Logo';

import classes from './Toolbar.module.scss';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ({ drawerToggleClicked, isAuth }) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={isAuth}/>
    </nav>
  </header>
);

export default toolbar;