import React from 'react'

import classes from './Backdrop.css';

const backdrop = ({ show, clicked }) => (
  show ? <div className={classes.Backdrop} onClick={clicked} role="presentation"></div> : null
);

export default backdrop;