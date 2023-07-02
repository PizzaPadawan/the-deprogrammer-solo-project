function gameReducer(state = [], action) {
    switch (action.type) {
        case "SET_GAMELIST":
            console.log(action.payload)
            action.payload.sort((a, b) => 
            a.result.Total > b.result.Total ? -1 : 
            a.result.Total < b.result.Total ? +1 : 0 )
            return action.payload;
        default:
            return state;
    }
}

export default gameReducer;