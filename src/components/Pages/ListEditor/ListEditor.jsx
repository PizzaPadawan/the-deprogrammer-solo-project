import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

export default function ListEditor() {

    useEffect(() => {
        dispatch({ type: 'FETCH_PANELS' });
    }, []);

    // Redux
    const dispatch = useDispatch();
    const panels = useSelector((store) => store.toplist.panelReducer);
    const toplist = useSelector((store) => store.toplist.toplistReducer);
    const currentList = useSelector(store => store.currentList)

    // local state
    const [newNotes, setNewNotes] = useState('');
    const [selectedTrack, setSelectedTrack] = useState('');
    const [selectedTrackID, setSelectedTrackID] = useState('');

    const setCurrentList = (playlistId) => {
        // keep our current list in our Redux store to reference across components
        dispatch({
            type: "SET_CURRENT_LIST",
            payload: playlistId
        })
    }

    // fetching our new toplist based on id sent
    const fetchToplist = (playlist_id) => {
        // validation
        if (!currentList || currentList === "Select an artist") {
            alert("Please select an active panel to view toplist")
            return;
        }

        dispatch({ type: 'FETCH_TOPLIST', payload: { playlist_id } })
    }

    // updating status of the track on toplist
    const trackStatus = (toplist_id, status) => {
        //validation
        if (!toplist_id || !status || !currentList) {
            alert("Error changing track status");
            return;
        }

        dispatch({
            type: "TRACK_STATUS",
            payload: {
                toplist_id,
                switch: status,
                playlist_id: currentList
            }
        })
    }

    // click handler to submit new track notes
    const editNote = () => {
        // give me validation
        if (!selectedTrack || !selectedTrackID || !newNotes) {
            alert("Please ensure you've selected a track and entered a note before submitting.")
            return;
        }

        dispatch({
            type: "EDIT_NOTES",
            payload: {
                notes: newNotes,
                toplist_id: selectedTrackID,
                playlist_id: currentList
            }
        })
        setNewNotes('');
        setSelectedTrack('');
    }


    return (
        <div>
            {toplist.length > 0 &&
            <div>
                {/* This text area will display differently depending on if we've selected a track to edit notes for */}
                {/* MAKE THIS A MODAL */}
                {selectedTrack
                    ? <>
                        {/* if we've selected a track, show the save and cancel buttons
                    as well as listing the selected track name in the placeholder */}
                        <textarea
                            rows="5"
                            cols="33"
                            value={newNotes}
                            onChange={e => setNewNotes(e.target.value)}
                            placeholder={`Edit notes for ${selectedTrack}`}
                            maxLength="1000"
                        />
                        <button onClick={editNote} >Save</button>
                        <button onClick={() => { setSelectedTrack(''), setNewNotes('') }}>Cancel</button>
                    </>
                    // if we haven't selected a track, the placeholder will let the user know how they can edit notes per track.
                    : <textarea
                        rows="5"
                        cols="33"
                        value={newNotes}
                        onChange={e => setNewNotes(e.target.value)}
                        placeholder={`Click "Edit Notes" button to edit track notes`}
                        maxLength="0"
                    />}
            </div>}
            <div>
                {/* this dropdown allows the user to select between all artist they're on a panel for */}
                <select
                    value={currentList}
                    onChange={e => setCurrentList(e.target.value)}>
                    <option>Select an artist</option>
                    {/* if our panels store is populated, bring our available panels into the dropdown */}
                    {panels.length > 0 &&
                        panels.map(panel => {
                            return (
                                // conditional rendering to only return panels with recording_date greater than or equal to today's date
                                moment(panel.recording_date).format('YYYY/MM/DD') > moment().subtract(1, 'days').format('YYYY/MM/DD') &&
                                <option
                                    key={panel.playlist_id}
                                    value={panel.playlist_id}
                                >{panel.artist}</option>
                            );
                        })}
                </select>
                {/* this button allows the user to commit to displaying the artist selected from the dropdown */}
                <button onClick={() => fetchToplist(currentList)}>Select</button>
                {/* if our toplist is populated, show the recording date for this panel */}
                {toplist.length > 0 &&
                    <>
                        <h4>{moment(toplist[0].recording_date).format('MM/DD/YYYY')}</h4>
                        <table>
                            <thead>
                                <tr>
                                    <td>Track</td>
                                    <td>Album</td>
                                    <td>Notes</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {toplist.map(track => {
                                    return (
                                        track.hidden
                                            ? <tr key={track.id}>
                                                <td>{track.track}</td>
                                                <td>{track.album}</td>
                                                <td>{track.notes}</td>
                                                <td></td>
                                                <td><button
                                                    value="SHOW"
                                                    onClick={e => trackStatus(track.id, e.target.value)}
                                                >Add</button></td>
                                            </tr>
                                            : <tr key={track.id}>
                                                <td>{track.track}</td>
                                                <td>{track.album}</td>
                                                <td>{track.notes}</td>
                                                {selectedTrack === track.track
                                                ? <td></td>
                                                :< td > <button
                                                        onClick={() => { setSelectedTrack(track.track), setSelectedTrackID(track.id) }}>
                                                    Edit Notes
                                                    </button></td>
                                                }
                                                <td><button
                                        value="HIDE"
                                        onClick={e => trackStatus(track.id, e.target.value)}
                                    >Remove</button></td>
                                            </tr>
                            )
                                })}
                        </tbody>
                    </table>
            </>
                }
        </div>
        </div >
    )
}