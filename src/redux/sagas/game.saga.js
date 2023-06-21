import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* gameMode(action){
    try {
        // admin PUT req to switch game mode status of current masterlist
        // action.payload:{playlist_id, switch}
        yield axios.put(`/game/mode${action.payload.playlist_id}`, action.payload)
        // refresh masterlist
        yield put({type: "FETCH_MASTERLIST", payload: action.payload.playlist_id})
    } catch (error) {
        console.log("Error on gameMode saga", error)
    }
}

function* playSong(action){
    // NOTE: put a "FETCH_TOPLIST" dispatch call in onClick for this one as well?
    try {
        // user PUT to put a song from their toplist into play
        // action.payload:{masterlist_id, playlist_id}
        yield axios.put(`/play/${action.payload.masterlist_id}`, action.payload)
        // refresh masterlist
        yield put({type: "FETCH_MASTERLIST", payload: action.payload.playlist_id})
    } catch (error) {
        console.log("Error on isPlayed saga", error)
    }
}

function* discussionMode(action){
    try {
        // admin DELETE to remove every masterlist item with is_played=FALSE
        // action.payload:{playlist_id}
        yield axios.delete(`/discussion/${action.payload.playlist_id}`);
        // refresh masterlist
        yield put({type:"FETCH_MASTERLIST", payload: action.payload.playlist_id});
    } catch (error) {
        console.log("Error on discussionMode saga", error)
    }
}


export default function* gameSaga(){
    yield takeEvery("GAME_MODE", gameMode);
    yield takeEvery("PLAY_SONG", playSong);
    yield takeEvery("DISCUSSION_MODE", discussionMode);
}