import currentListReducer from "./currentList.reducer";

describe("Testing currentListReducer:", () => {
    test("testing for correct initial state of 0", () => {
        let action = {}
        let returnedState = currentListReducer(undefined, action);
        expect(returnedState).toEqual(0);
    });

    test("testing SET_CURRENT_LIST, should return 22", () => {
        let action = {
            type: "SET_CURRENT_LIST",
            payload: 22
        }
        let returnedState = currentListReducer(undefined, action);
        expect(returnedState).toEqual(22);
    })
})