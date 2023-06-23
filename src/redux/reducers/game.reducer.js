function gameReducer(state = [], action) {
    switch (action.type) {
        case "SET_GAMELIST":
            action.payload.sort((a, b) => 
            a.result.total > b.result.total ? -1 : 
            a.result.total < b.result.total ? +1 : 0 )
            return action.payload;
        default:
            return state;
    }
}

export default gameReducer;