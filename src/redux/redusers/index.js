import { combineReducers } from "redux";
import productReduser, { brandsReducer, gendersReducer, disCountsReducer, seasonsReducer, colorsReducer, categoriesReducer } from "./redusers"

const redusers = combineReducers({
    product: productReduser,
    brands: brandsReducer,
    genders: gendersReducer,
    discounts: disCountsReducer,
    seasons: seasonsReducer,
    colors: colorsReducer,
    categories: categoriesReducer,
})

export default redusers;