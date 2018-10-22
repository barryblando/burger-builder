import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = ({ clicked }) => (
  <button type="button" className={classes.ToggleButton} onClick={clicked}>
    <div className={classes.ToggleButton__line} />
    <div className={classes.ToggleButton__line} />
    <div className={classes.ToggleButton__line} />
  </button>
);

export default drawerToggle;
