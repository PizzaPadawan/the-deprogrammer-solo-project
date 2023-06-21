import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";


function* postMasterlist(action){
    try {
        // axios.get retreives access code
        yield axios.get('/api/spotify/');
        // axios.post adds playlist data to DB
        // sends action.payload:{spotify_id(REQUIRED), recording_date(OPTIONAL)}
        yield axios.post('/api/spotify/', action.payload);
    } catch (error) {
        console.log("Error on pullMasterlist saga", error);
    }
}

function* fetchMasterlist(action){
    try {
        // axios.get retrieves masterlist by playlist_id
        // action.payload:{playlist_id}
        const response = axios.get(`/masterlist/${action.payload.playlist_id}`);
        // yield put sends response.data to masterlist.reducer to be stored in Redux
        yield put({type: 'SET_MASTERLIST', payload: response.data});
    } catch (error) {
        console.log("Error on fetchMasterlist saga", error);
    }
}


function* updateRecordingDate(action){
    try {
        // axios.put to playlist_id updates the masterlist items associated with specified playlist_id
        // action.payload:{playlist_id, recording_date}
        yield axios.put(`masterlist/${action.payload.playlist_id}`, action.payload)
        // yield put calls fetchMasterlist function to update currently displayed masterlist with new date
        yield put({type: 'FETCH_MASTERLIST', payload: action.payload});
    } catch (error) {
        console.log("Error on updateRecordingDate saga", error);
    }
}

export default function* masterlistSaga(){
    yield takeEvery('POST_MASTERLIST', postMasterlist);
    yield takeEvery('FETCH_MASTERLIST', fetchMasterlist);
    yield takeEvery('UPDATE_RECORDING_DATE', updateRecordingDate);
}