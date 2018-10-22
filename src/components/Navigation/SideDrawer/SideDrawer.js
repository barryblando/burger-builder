import React, { Fragment } from 'react'

import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.scss';

const sideDrawer = ({ open, closed, isAuth }) => {
  let attachedClasses = [classes.SideDrawer, classes.CLose];

  if (open) {
    // mutate & combine with Open class
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Fragment>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={isAuth} />
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDrawer;

