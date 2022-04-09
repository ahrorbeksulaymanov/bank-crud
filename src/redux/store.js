import { createStore } from "redux";
import redusers from "./redusers";


export const store = createStore(
    redusers,
    {},
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)