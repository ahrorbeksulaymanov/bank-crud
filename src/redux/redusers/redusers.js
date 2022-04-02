import { GENDER_VAL, SEARCH_VAL } from "../actions";


const reducer = ( state = {search_val: "", gender_val: ''}, action) => {
    switch(action.type){
        case SEARCH_VAL:
            return action.data;
        case GENDER_VAL:
            return action.data
        default:
            return state
    }
};
export default reducer;