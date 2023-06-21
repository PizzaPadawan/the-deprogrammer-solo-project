import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";


function* fetchPanels(){
    try {
        // GET list of details for a given panel
        const response = yield axios.get('/toplist/panels');
        // SETTER function to store response.data in Redux
        yield put({type: "SET_PANELS", payload: response.data});
    } catch (error) {
        console.log("Error on fetchPanels toplist saga", error);
    }
}

function* addUser(action){
    try {
        // posts a new toplist for user based on list referenced and username added
        // action.payload:{list_id, username}
        yield axios.post(`/toplist/${action.payload.list_id}`, action.payload)
        // refresh panel details
        yield put({type: "FETCH_PANELS"});
    } catch (error) {
        console.log("Error on addUser toplist saga", error);
    }
}

function* fetchToplist(action){
    try {
        // get toplist based on playlist_id reference
        const response = yield axios.get(`/toplist/top/${action.payload.playlist_id}`)
        yield put({type: "SET_TOPLIST", payload: response.data});
    } catch (error) {
        console.log("Error on getToplist toplist saga", error);
    }
}

export default function* toplistSaga(){
    yield takeEvery("FETCH_PANELS", fetchPanels);
    yield takeEvery("FETCH_TOPLIST", fetchToplist);
    yield takeEvery("ADD_USER", addUser);
}