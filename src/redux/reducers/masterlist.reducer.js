function masterlistReducer(state = [], action) {
    switch (action.type) {
        case "SET_MASTERLIST":
            return action.payload;
        default:
            return state;
    }
}

export default masterlistReducer;
