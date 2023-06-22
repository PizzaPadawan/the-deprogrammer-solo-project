import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import moment from "moment";


export default function MasterList({ currentList, setCurrentList }) {

    // Redux 
    const dispatch = useDispatch();
    const masterlist = useSelector(store => store.masterlist);
    const panels = useSelector(store => store.toplist.panelReducer);

    // local state
    const [newDate, setNewDate] = useState('');
    const [playlistURL, setPlaylistURL] = useState('');

    // that's so fetch
    const fetchMasterlist = (playlist_id) => {
        //but only if there's actually a value there, duh
        if (!currentList) {
            alert("Please select an active panel to view masterlist")
            return;
        }
        dispatch({ type: 'FETCH_MASTERLIST', payload: { playlist_id } })
        dispatch({ type: 'FETCH_PANEL_USERS', payload: { playlist_id } })
    }

    // .slice the correct value out of the provided url for the spotify_id
    const sliceAndSend = () => {
        if (!playlistURL) {
            alert("Please enter a playlist URL");
            return;
        }

        let spotifyID = playlistURL.slice(34, 56);
        console.log(spotifyID, newDate)
        dispatch({
            type: "POST_MASTERLIST",
            payload: {
                spotify_id: spotifyID,
                recording_date: newDate
            }
        });
        setNewDate('');
        setPlaylistURL('');
    }

    return (
        <div>
            <select
                value={currentList}
                onChange={e => setCurrentList(e.target.value)}>
                <option value={''} >Select a panel</option>
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
            <button onClick={() => fetchMasterlist(currentList)} >Select</button>
            {masterlist.length > 0 && currentList &&
                masterlist[0].recording_date
                ? <h4>{moment(masterlist[0].recording_date).format('MM/DD/YYYY')}</h4>
                : <input
                    type="text"
                    placeholder="Recording Date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                />}
            {!currentList &&
                <>
                    <input
                        type="text"
                        value={playlistURL}
                        onChange={e => setPlaylistURL(e.target.value)}
                    />
                    <button onClick={sliceAndSend}>Import Playlist</button>
                </>}
            <table>
                <thead>
                    <tr>
                        <td>Track</td>
                        <td>Album</td>
                    </tr>
                </thead>
                <tbody>
                    { currentList
                        ? masterlist.map(track => {
                            return (
                                <tr key={track.id}>
                                    <td>{track.track}</td>
                                    <td>{track.album}</td>
                                </tr>
                            )
                        })
                        : null
                        }
                </tbody>
            </table>
        </div>
    )
}