import { combineReducers } from "redux";

const masterlistReducer = (state=[], action) => {
    switch (action.type) {
        case "SET_MASTERLIST":
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    masterlistReducer
})