import React, { Fragment } from 'react';

import classes from './Button.module.scss';

const button = props => {
  const { btnType, clicked, children, disabled } = props;
  return (
    <Fragment>
      <button
        type="submit"
        disabled={disabled}
        className={[classes.Button, classes[btnType]].join(' ')}
        onClick={clicked}
      >
        {children}
      </button>
    </Fragment>
  );
};

export default button;
