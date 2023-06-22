import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";

export default function ListEditor({ currentList, setCurrentList }) {

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_PANELS' });
    //     console.log("USING EFFECT")
    // }, []);

    // Redux
    const dispatch = useDispatch();
    const panels = useSelector((store) => store.toplist.panelReducer);
    const toplist = useSelector((store) => store.toplist.toplistReducer);

    // local state
    const [newNotes, setNewNotes] = useState('');
    const [selectedTrack, setSelectedTrack] = useState('');

    // fetching our new toplist based on id sent
    const fetchToplist = (playlist_id) => {
        if (!currentList || currentList === "Select an artist") {
            alert("Please select an active panel to view toplist")
            return;
        }

        dispatch({ type: 'FETCH_TOPLIST', payload: { playlist_id } })
    }

    // updating status of the track on toplist
    const cutFromTheTeam = (toplist_id, status) => {

        console.log(toplist_id, status, currentList);

        // dispatch({
        //     type: "TRACK_STATUS",
        //     payload: {
        //         toplist_id,
        //         switch: status,
        //         playlist_id: currentList
        //     }
        // })
    }


    return (
        <div>
            <div>
                {selectedTrack
                    ? <textarea
                        rows="5"
                        cols="33"
                        value={newNotes}
                        onChange={e => setNewNotes(e.target.value)}
                        placeholder={`Edit notes for ${selectedTrack}`}
                        maxLength="1000"
                    />
                    : <textarea
                        rows="5"
                        cols="33"
                        value={newNotes}
                        onChange={e => setNewNotes(e.target.value)}
                        placeholder={`Click on a track title to edit notes`}
                        maxLength="0"
                    />}
            </div>
            <div>
                <select
                    value={currentList}
                    onChange={e => setCurrentList(e.target.value)}>
                    <option>Select an artist</option>
                    {panels.length > 0 &&
                        panels.map(panel => {
                            return (
                                <option
                                    key={panel.playlist_id}
                                    value={panel.playlist_id}
                                >{panel.artist}</option>
                            );
                        })}
                </select>
                <button onClick={() => fetchToplist(currentList)}>Select</button>
                <h4>{toplist.length > 0 && moment(toplist[0].recording_date).format('MM/DD/YYYY')}</h4>
                <table>
                    <thead>
                        <tr>
                            <td>Track</td>
                            <td>Album</td>
                            <td>Notes</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {toplist.length > 0 && currentList
                            ? toplist.map(track => {
                                return (
                                    track.hidden
                                        ? <tr key={track.id}>
                                            <td>{track.track}</td>
                                            <td>{track.album}</td>
                                            <td>{track.notes}</td>
                                            <td><button
                                                value="SHOW"
                                                onClick={e => cutFromTheTeam(track.id, e.target.value)}
                                            >PUT ME IN COACH</button></td>
                                        </tr>
                                        : <tr key={track.id}>
                                            <td onClick={() => setSelectedTrack(track.track)}>{track.track}</td>
                                            <td>{track.album}</td>
                                            <td>{track.notes}</td>
                                            <td><button
                                                value="HIDE"
                                                onClick={e => cutFromTheTeam(track.id, e.target.value)}
                                            >CUT FROM THE TEAM</button></td>
                                        </tr>
                                )
                            })
                            : <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}