import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";


function* fetchPanels() {
    try {
        // GET list of details for a given panel
        const response = yield axios.get('/api/toplist/panels');
        console.log(response.data)
        // SETTER function to store response.data in Redux
        yield put({ type: "SET_PANELS", payload: response.data });
        yield put({ type: "FETCH_TOPLIST", payload: response.data[0]})
    } catch (error) {
        console.log("Error on fetchPanels toplist saga", error);
    }
}

function* fetchPanelUsers(action) {
    try {
        // GET list of users on a panel
        // action.payload:{playlist_id}
        const response = yield axios.get(`/api/toplist/panels/${action.payload.playlist_id}`);
        yield put({ type: "SET_PANEL_USERS", payload: response.data });
    } catch (error) {
        console.log("Error on fetchPanelUsers toplist saga", error);
    }
}

function* fetchToplist(action) {
    try {
        // GET toplist based on playlist_id reference
        // action.payload:{playlist_id}
        const response = yield axios.get(`/api/toplist/top/${action.payload.playlist_id}`)
        // SETTER function to store response.data in Redux
        yield put({ type: "SET_TOPLIST", payload: response.data });
    } catch (error) {
        console.log("Error on getToplist toplist saga", error);
    }
}

function* addUser(action) {
    try {
        // posts a new toplist for user based on list referenced and username added
        // action.payload:{list_id, username}
        yield axios.post(`/api/toplist/${action.payload.list_id}`, action.payload)
        // refresh panel details
        yield put({ type: "FETCH_PANELS" });
    } catch (error) {
        console.log("Error on addUser toplist saga", error);
    }
}

function* removeUser(action) {
    try {
        // DELETE to remove user from panel based on user_id and playlist_id
        // action.payload{ user_id, playlist_id }
        yield axios.delete(`/api/toplist/${action.payload.user_id}`, action.payload)
        // refresh panel details
        yield put({ type: "FETCH_PANELS" })
    } catch (error) {
        console.log("Error on removeUser toplist saga", error);
    }
}

function* trackStatus(action) {
    try {
        // PUT to switch the is_hidden value of a single item in a user's toplist
        // action.payload:{toplist_id, switch: "HIDE" || "SHOW", playlist_id}
        yield axios.put(`/api/toplist/hidden/${action.payload.toplist_id}`, action.payload);
        // refresh toplist
        yield put({type: "FETCH_TOPLIST", payload: action.payload.playlist_id})
    } catch (error) {
        console.log("Error on trackHidden toplist saga", error);
    }
}

function* editNotes(action){
    try {
        //PUT to change the notes on a specific toplist_id
        //action.payload{notes, toplist_id, playlist_id}
        yield axios.put(`/api/toplist/notes/${action.payload.toplist_id}`, action.payload);
        // refresh toplist
        yield put({type: "FETCH_TOPLIST", payload: action.payload.playlist_id})
    } catch (error) {
        console.log("Error on editNotes toplist saga", error);
    }
}

export default function* toplistSaga() {
    yield takeEvery("FETCH_PANELS", fetchPanels);
    yield takeEvery("FETCH_TOPLIST", fetchToplist);
    yield takeEvery("FETCH_PANEL_USERS", fetchPanelUsers);
    yield takeEvery("ADD_USER", addUser);
    yield takeEvery("REMOVE_USER", removeUser);
    yield takeEvery("TRACK_STATUS", trackStatus);
}