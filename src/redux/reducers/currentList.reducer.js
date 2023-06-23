export default function currentListReducer(state = 0, action) {
    switch (action.type) {
        case "SET_CURRENT_LIST":
            return action.payload;
        default:
            return state;
    }
}