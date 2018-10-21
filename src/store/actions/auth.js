import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => ({ type: actionTypes.AUTH_START });
export const authSuccess = ({ idToken, localId }) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken,
  localId
});

export const authFail = error => ({ type: actionTypes.AUTH_FAIL, error });

export const logout = () =>  {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000); // 3.6secs * 1000 = 3,600 secs / 60 secs = 60 mins = 1Hr Expiration Time
  }
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCE1zoAXn_sfN2sVUvTszQtfvgsBoPlAM8';

    // if not in sign up mode, then..
    if (!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCE1zoAXn_sfN2sVUvTszQtfvgsBoPlAM8'
    }

    let expirationDate = null;
    axios
      .post(url, authData)
      .then(response => console.log('[Auth] Success Response: ', response) ||
        (
          expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000),
          localStorage.setItem('token', response.data.idToken),
          localStorage.setItem('expirationDate', expirationDate),
          localStorage.setItem('userId', response.data.localId),
          dispatch(authSuccess(response.data)),
          dispatch(checkAuthTimeout(response.data.expiresIn))
        )
      )
      .catch(error => console.log('[Auth] Error Response: ', error) || dispatch(authFail(error.response.data.error)));
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () =>  {
  return dispatch => {
    const token = localStorage.getItem('token');
    // if token is null, we can't validate but this needs to be true-ish
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      // if future date <= current date, logout
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess({ idToken: token, localId: userId }));
        // (future date - current date) / 1000, value to pass in checkAuthTimeout should be in seconds
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};