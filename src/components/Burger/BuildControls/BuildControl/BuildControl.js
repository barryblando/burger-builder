import React from 'react';

import classes from './BuildControl.module.scss';

const buildControl = ({ added, removed, disabled, label }) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{label}</div>
    <button
      className={classes.Less}
      onClick={removed}
      disabled={disabled}>Less</button>
    <button
      className={classes.More}
      onClick={added}>More</button>
  </div>
);

export default buildControl;