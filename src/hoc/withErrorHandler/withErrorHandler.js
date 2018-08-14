import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  // return anonymous class
  return class extends Component {
    state = {
      error: null,
    }

    // componentWillMount will be called before the child components are rendered
    // EFFECTS: registering the interceptors before rendering child components
    UNSAFE_componentWillMount() {
      // Receive error from axios instance
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    // after the execution of interceptors, UnMount & Eject it
    componentWillUnmount() {
      console.log('[withErrorHandler] Will UnMount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      // Test: Receive props
      console.log('[withErrorHandler] this.props: ', this.props);

      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
            >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliary>
      );
    }
  }
};

export default withErrorHandler;