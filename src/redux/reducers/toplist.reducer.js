import { combineReducers } from "redux";

function panelReducer(state = [], action){
    switch (action.type) {
        case "SET_PANELS":
            return action.payload;
        default:
            return state;
    }
}

function toplistReducer(state = [], action){
    switch(action.type){
        case "SET_TOPLIST":
            return action.payload;
        default:
            return state;
    }
}

function panelUserReducer(state=[],action){
    switch(action.type){
        case "SET_PANEL_USERS":
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    panelReducer,
    toplistReducer,
    panelUserReducer
})