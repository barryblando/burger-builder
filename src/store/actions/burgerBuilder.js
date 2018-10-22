import axios from '../../axios-order';
import * as actionTypes from './actionTypes';

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return dispatch => {
    // TODO - get all the ingredients from firebase
    axios.get('/ingredients.json')
      .then(response => {
      // TODO - destructure response data
      const { salad, bacon, cheese, meat } = response.data;
      // TODO - set the ingredients position starting with salad manually
      const ingredients = { salad, bacon, cheese, meat };
      // TODO - dispatch ingredients
      dispatch(setIngredients(ingredients))
    })
    .catch(error => {
      // TODO - if can't retrieve endpoint then set error to true
      dispatch(fetchIngredientsFailed());
    });
  };
};