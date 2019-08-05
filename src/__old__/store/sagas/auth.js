import axios from 'axios';
import { delay } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';

import * as actions from '../actions';

// https://medium.com/@MattiaManzati/tips-to-handle-authentication-in-redux-4d596e11bb21

export function* logoutSaga(action) {
  // after yielding/executing step by step, dispatch action using put
  yield call([localStorage, 'removeItem'], 'token', 'expirationDate', 'userId');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

// if watcher executes sagas after certain actions it listens to, it will use the action creator's payloads that have been passed in.
export function* checkAuthTimeoutSaga({ expirationTime }) {
  // delay, delays the execution of the next step
  yield delay(expirationTime * 1000); // 3.6s  ecs * 1000 = 3,600 secs / 60 secs = 60 mins = 1Hr Expiration Time
  yield put(actions.logout());
}

export function* authUserSaga({ email, password, isSignUp }) {
  yield put(actions.authStart());

  const authData = { email, password, returnSecureToken: true };
  let url =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCE1zoAXn_sfN2sVUvTszQtfvgsBoPlAM8';

  // if not in sign up mode, then..
  if (!isSignUp) {
    url =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCE1zoAXn_sfN2sVUvTszQtfvgsBoPlAM8';
  }

  try {
    // const response = yield axios.post(url, authData);
    const { data } = yield call(axios.post, url, authData);
    const expirationDate = yield new Date(new Date().getTime() + data.expiresIn * 1000);
    yield localStorage.setItem('token', data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', data.localId);
    yield put(actions.authSuccess(data));
    yield put(actions.checkAuthTimeout(data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga(action) {
  const token = yield localStorage.getItem('token');
  // if token is null, we can't validate but this needs to be true-ish
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
    // if future date <= current date, logout
    if (expirationDate <= new Date()) {
      yield put(actions.logout());
    } else {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess({ idToken: token, localId: userId }));
      // (future date - current date) / 1000, value to pass in checkAuthTimeout should be in seconds
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    }
  }
}
