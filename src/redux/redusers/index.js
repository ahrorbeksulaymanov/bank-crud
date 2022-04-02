import { combineReducers } from "redux";
import productReduser from "./redusers"

const redusers = combineReducers({
    product: productReduser
})

export default redusers;