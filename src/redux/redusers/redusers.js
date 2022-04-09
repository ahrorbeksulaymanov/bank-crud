import { ActionTypes } from "../constants/action-types";


const reducer = ( state = {search_val: "", gender_val: ''}, action) => {
    switch(action.type){
        case ActionTypes.SEARCH_VAL:
            return action.data;
        case ActionTypes.GENDER_VAL:
            return action.data
        default:
            return state
    }
};
export default reducer;

const intialState = {
    brands: [],
  };
  
  export const brandsReducer = (state = intialState, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_BRANDS:
        return { ...state, brands: payload };
      default:
        return state;
    }
  };

  const intialGenders = {
    genders: [],
  };
  
  export const gendersReducer = (state = intialGenders, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_GENDERS:
        return { ...state, genders: payload };
      default:
        return state;
    }
  };

  const intialDiscounts = {
    discounts: [],
  };
  
  export const disCountsReducer = (state = intialDiscounts, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_DISCOUNTS:
        return { ...state, discounts: payload };
      default:
        return state;
    }
  };

  const intialSeasons = {
    seasons: [],
  };
  
  export const seasonsReducer = (state = intialSeasons, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_SEASONS:
        return { ...state, seasons: payload };
      default:
        return state;
    }
  };

  const intialColors = {
    colors: [],
  };
  
  export const colorsReducer = (state = intialColors, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_COLORS:
        return { ...state, colors: payload };
      default:
        return state;
    }
  };

  const intialCategories = {
    categories: [],
  };
  
  export const categoriesReducer = (state = intialCategories, { type, payload }) => {
    switch (type) {
      case ActionTypes.SET_CATEGORY:
        return { ...state, categories: payload };
      default:
        return state;
    }
  };