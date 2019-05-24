import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, component: ComponentPage, ...rest }) => (
  <Route {...rest} component={props => (isAuthenticated ? <Redirect to="/" /> : <ComponentPage {...props} />)} />
);

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.userId, // flip string id to actual boolean value
});

export default connect(mapStateToProps)(PublicRoute);
