import React, { Fragment } from 'react';

import classes from './Alert.module.scss';

const alert = ({ children, type }) => {
  let styleClass = null;
  let alertTxt = '';

  switch (type) {
    case 'Success':
      styleClass = classes.SuccessAlert;
      alertTxt = 'Success';
      break;
    case 'Error':
      styleClass = classes.ErrorAlert;
      alertTxt = 'Error';
      break;
    default:
      styleClass = null;
  }

  return (
    <Fragment>
      <p className={styleClass}>
        <strong>{alertTxt}!</strong> {children}
      </p>
    </Fragment>
  );
};

export default alert;
