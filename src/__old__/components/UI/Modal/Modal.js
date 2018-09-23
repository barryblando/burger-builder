import React, { Component, Fragment } from 'react';
import isEqual from 'react-fast-compare';

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

  // Prevent OrderSummary from updating when adding and removing
  // react only when show is true & props.children is different (OrderSummary / Spinner)
  // don't react on clicked listener
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Modal] [prevProps/this.props]: ', this.props.show, this.props.children);
    console.log('[Modal] [nextProps]: ', nextProps.show, nextProps.children);
    return !isEqual(this.props, nextProps);
  }

  render() {
    const { show, modalClosed, children } = this.props;

    return (
      <Fragment>
        <Backdrop show={show} clicked={modalClosed}/>
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: show ? '1' : '0'
          }}
          >
          {children}
        </div>
      </Fragment>
    );
  }
}

export default Modal;