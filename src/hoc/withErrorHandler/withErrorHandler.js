import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

// INFO: https://reactjs.org/docs/higher-order-components.html
const withErrorHandler = (WrappedComponent, axios) => {
  // return anonymous class
  return class extends Component {
    state = {
      error: null,
    }

    /**
     * DO:
     *  - componentWillMount will be called before the child components are rendered, so set interceptors. interceptors are function that can be
     *    define globally which will be executed (e.g within component/actionCreator) for every request leaving the app and every response
     *    returning into it.
     * WHY:
     *  - If http response gets error during execution, withErrorHandler can still catch it due to same axios instance used.
     * CONCLUSION:
     *  - intercept requests or responses before they are handled by .then or .catch
     */
    UNSAFE_componentWillMount() {
      // store the interceptors in properties of class by using 'this' which refer to class
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        console.log('[withErrorHandler] Interceptor Request: ', req);
        return req;
      });

      // set error from axios instance if something happen to response
      this.resInterceptor = axios.interceptors.response.use(
        res => console.log('[withErrorHandler] Interceptor Response: ', res) || res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    /**
     * DO:
     *  - after the execution of interceptors, clear old interceptors in memory for the next component who will use withErrorHandler.
     * WHY:
     *  - dead interceptors sitting in memory which actually not dead but still react to requests, worst case they lead to errors or do somehow
     *    change state of the app. leaks memory that is not required anymore.
     * CONCLUSION:
     *  - componentWillMount will be called again and again because of the anonymous class component and is created every time
     *    which was wrapped around existing component, every time we call withErrorHandler, w/o UnMounting interceptors we're actually attaching
     *    multiple of it in the app and we're attaching them to the same axios instance. Use UnMount lifeCycle then eject interceptors.
     */
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