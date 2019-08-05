import * as actionTypes from './actionTypes';

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authSuccess = ({ userId }) => ({
  type: actionTypes.AUTH_SUCCESS,
  userId,
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

// action creator for sagaWatcher to listen and use its forwarded payloads/actions if have one
export const logout = () => ({ type: actionTypes.AUTH_INITIATE_LOGOUT });
export const logoutSucceed = () => ({ type: actionTypes.AUTH_LOGOUT });

// set payloads for auth & authNetwork 'cause authUserSaga & authNetworkSaga depends on these actions to use
export const auth = (email, password, isSignUp) => ({
  type: actionTypes.AUTH_USER,
  email,
  password,
  isSignUp,
});

export const authNetwork = authName => ({
  type: actionTypes.AUTH_NETWORK,
  authName,
});

export const authCheckState = () => ({ type: actionTypes.AUTH_CHECK_INITIAL_STATE });

export const setAuthRedirectPath = path => ({ type: actionTypes.SET_AUTH_REDIRECT_PATH, path });
