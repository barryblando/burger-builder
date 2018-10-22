import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import isEqual from 'react-fast-compare';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const modalRoot = document.getElementById('modal-root');

class Modal extends Component {

  // TODO -- Prevent OrderSummary from unnecessary render when adding and removing
  // react only when show is true & props.children is different, don't react on clicked listener
  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Modal] [prevProps/this.props]: ', this.props.show, this.props.children);
    console.log('[Modal] [nextProps]: ', nextProps.show, nextProps.children);
    return !isEqual(this.props, nextProps);
  }

  render() {
    const { show, modalClosed, children } = this.props;
    // INFO: https://reactjs.org/docs/portals.html
    return ReactDOM.createPortal(
        <Fragment>
          <Backdrop show={show} clicked={modalClosed} />
          <div
            className={classes.Modal}
            style={{
              transform: show ? 'translateY(0)' : 'translateY(-10vh)',
              opacity: show ? '1' : '0',
            }}
            >
            {children}
          </div>
        </Fragment>,
      modalRoot
    );
  }
}

export default Modal;