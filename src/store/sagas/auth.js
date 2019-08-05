import { put, call, take } from 'redux-saga/effects';
import reduxSagaFirebase, { firebase } from '../../config/firebaseConfig';

import * as actions from '../actions';

// [MORE INFO]: https://flaviocopes.com/redux-saga/

export function* logoutSaga() {
  // after yielding/executing step by step, dispatch action using put
  try {
    yield call(reduxSagaFirebase.auth.signOut);
    yield put(actions.logoutSucceed());
  } catch (error) {
    console.log(error);
  }
}

export function* authNetworkSaga({ authName }) {
  yield put(actions.authStart());
  const authProvider = new firebase.auth[`${authName}Provider`]();
  try {
    yield call(reduxSagaFirebase.auth.signInWithPopup, authProvider);
    yield put(actions.authCheckState());
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* authUserSaga({ email, password, isSignUp }) {
  yield put(actions.authStart());

  let auth = reduxSagaFirebase.auth.createUserWithEmailAndPassword;

  // if not in sign up mode, then..
  if (!isSignUp) {
    auth = reduxSagaFirebase.auth.signInWithEmailAndPassword;
  }

  try {
    const data = yield call(auth, email, password);
    console.log('Data Logged In: ', data);
    yield put(actions.authSuccess({ userId: data.user.uid }));
  } catch (error) {
    yield put(actions.authFail(error));
  }
}

export function* authCheckStateSaga() {
  const channel = yield call(reduxSagaFirebase.auth.channel);

  try {
    const { user } = yield take(channel);
    if (user) {
      yield put(actions.authSuccess({ userId: user.uid }));
    } else {
      yield put(actions.logout());
    }
  } catch (error) {
    console.log(error);
  }
}
