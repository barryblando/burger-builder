import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// PrivateRouter wrapper around Route Components, in order to add some conditional logic
// To determined if users are authenticated or not, rendering private components or redirecting.
// Destructure props w/c is isAuthenticated, component, and the rest (i.e path, exact), and then
// pass props(i.e history, etc) using render from Route to ComponentPage.
// NOTE: Route API provides render methods to components needing access i.e history APIs
const PrivateRouter = ({ isAuthenticated, component: ComponentPage, ...rest }) => (
  <Route {...rest} render={props => (isAuthenticated ? <ComponentPage {...props} /> : <Redirect to="/" />)} />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.userId, // eslint-disable-line
});

export default connect(mapStateToProps)(PrivateRouter);
