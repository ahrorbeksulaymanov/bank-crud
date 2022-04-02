import { createStore } from "redux";
import redusers from "./redusers";


export const store = createStore(
    redusers,
    {}
)