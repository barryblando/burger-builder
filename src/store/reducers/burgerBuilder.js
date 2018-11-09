import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/index';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false, // set to true whenever we add or remove an ingredient
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const _updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
  const _updateIngredients = updateObject(state.ingredients, _updateIngredient);
  const _updatedState = {
    ingredients: _updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, _updatedState);
};

const removeIngredient = (state, action) => {
  const _updateIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
  const _updateIngredients = updateObject(state.ingredients, _updateIngredient);
  const _updatedState = {
    ingredients: _updateIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, _updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false,
  });
};

const fetchIngredientsFailed = (state, action) => updateObject(state, { error: true });

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state);
    default: return state;
  }
};

export default reducer;