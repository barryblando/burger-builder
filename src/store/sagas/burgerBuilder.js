import { put, call } from 'redux-saga/effects';
import reduxSagaFirebase from '../../config/firebaseConfig';

import * as actions from '../actions';

export function* initIngredientsSaga() {
  // TODO - get all the ingredients from firebase
  try {
    const data = yield call(reduxSagaFirebase.database.read, 'ingredients');
    // TODO - destructure response data
    const { salad, bacon, cheese, meat } = data;
    // TODO - set the ingredients position starting with salad manually
    const ingredients = { salad, bacon, cheese, meat };
    // TODO - dispatch ingredients
    yield put(actions.setIngredients(ingredients));
  } catch (e) {
    // TODO - if can't retrieve endpoint then set error to true
    yield put(actions.fetchIngredientsFailed());
  }
}
