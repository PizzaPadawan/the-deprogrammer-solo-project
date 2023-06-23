function gameReducer(state = [], action) {
    switch (action.type) {
        case "SET_GAMELIST":
            return [...state, action.payload];
        default:
            return state;
    }
}

export default gameReducer;