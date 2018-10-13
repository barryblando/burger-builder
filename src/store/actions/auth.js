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

    axios
      .post(url, authData)
      .then(response => console.log('[Auth] Success Response: ', response) ||
        ( dispatch(authSuccess(response.data)), dispatch(checkAuthTimeout(response.data.expiresIn)) )
      )
      .catch(error => console.log('[Auth] Error Response: ', error) || dispatch(authFail(error.response.data.error)));
  };
};