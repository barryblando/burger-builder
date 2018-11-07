import * as actionTypes from './actionTypes';

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authSuccess = ({ idToken, localId }) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  localId
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

// action creator for sagaWatcher
export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });

// action creator for Sagas
export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

// set payloads for checkAuthTimeout & auth 'cause redux saga depends on these actions to use
export const checkAuthTimeout = expirationTime => ({
  type: actionTypes.AUTH_CHECK_TIMEOUT,
  expirationTime
});

export const auth = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignUp
});

export const authCheckState = () => ({ type: actionTypes.AUTH_CHECK_INITIAL_STATE });

export const setAuthRedirectPath = path => ({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path })