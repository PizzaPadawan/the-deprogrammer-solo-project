import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";

export default function MasterList() {

    useEffect(() => {
        dispatch({ type: 'FETCH_PANELS' });
    }, []);

    // Redux 
    const dispatch = useDispatch();
    const masterlist = useSelector(store => store.masterlist);
    const panels = useSelector(store => store.toplist.panelReducer);
    const currentList = useSelector(store => store.currentList)

    // local state
    const [newDate, setNewDate] = useState('');
    const [playlistURL, setPlaylistURL] = useState('');
    const [editDateMode, setEditDateMode] = useState(false);
    const [playlistId, setPlaylistId] = useState('') 


    // retreive our masterlist, enter dispatch hell
    const fetchMasterlist = (playlist_id) => {
        //but only if there's actually a value there, duh
        dispatch({ type: 'SET_CURRENT_LIST', payload: playlist_id })
        dispatch({ type: 'FETCH_MASTERLIST', payload: { playlist_id } })
        dispatch({ type: 'FETCH_PANEL_USERS', payload: { playlist_id } })
    }

    // .slice the correct value out of the provided url for the spotify_id
    const sliceAndSend = () => {
        if (!playlistURL) {
            alert("Please enter a playlist URL");
            return;
        }
        // cuts out the 22-character spotify ID and sends it to be input on the spotify POST
        let spotifyID = playlistURL.slice(34, 56);
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

    const postNewDate = () => {
        // validate so user doesn't send empty data
        if (!newDate) {
            alert("Please enter new date before saving")
            return;
        }
        // dispatch to send newDate to current playlist_id
        dispatch({
            type: "UPDATE_RECORDING_DATE",
            payload: {
                playlist_id: currentList,
                recording_date: newDate
            }
        })
        // reset our local state
        setEditDateMode(false);
        setNewDate('');

    }

    return (
        <div>
            {/* this dropdown will allow the admin to select the masterlist to view */}
            <select
                value={playlistId}
                onChange={e => setPlaylistId(e.target.value)}>
                <option value={0} >Select panel / import new</option>
                {/* only try to map if our panels store is updated */}
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

            {/* confirmation button to set our displayed masterlist to the currentList set
            by the select menu above */}
            <button onClick={() => fetchMasterlist(playlistId)} >Select</button>

            {/* is our masterlist populated? */}
            {masterlist.length > 0 && currentList && masterlist[0].recording_date
                // if we've clicked on the currently displayed date to change it,
                // we want to render the input and buttons necessary to send new data
                ? editDateMode
                    ? <>
                        {/* input to set newDate value */}
                        <input
                            type="text"
                            placeholder={moment(masterlist[0].recording_date).format('MM/DD/YYYY')}
                            value={newDate}
                            onChange={e => setNewDate(e.target.value)}
                        />
                        {/* button to post new date to our masterlist */}
                        <button onClick={postNewDate} >Save</button>
                        {/* button to exit editDateMode without saving changes */}
                        <button onClick={() => setEditDateMode(false)}>Cancel</button>
                    </>
                    // if not, display the current recording_date for this masterlist
                    : <>
                    <p>Recording date: {moment(masterlist[0].recording_date).format('MM/DD/YYYY')}</p><button onClick={() => setEditDateMode(true)}>Edit Date</button>
                    </>
                // if we're not currently displaying a masterlist, this will be the input field
                // to add a date for the new list we'll be importing.
                : <input
                    type="text"
                    placeholder="Recording Date"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                />}

            {/* we only want this to try render if we haven't selected a valid masterlist.
            this will be our input field and button to add a spotify playlist link */}
            {!masterlist[0] &&
                <>
                    <input
                        type="text"
                        placeholder="Paste Spotify playlist link here"
                        value={playlistURL}
                        onChange={e => setPlaylistURL(e.target.value)}
                    />
                    {/* after setting local state with our playlist url input, clicking this button
                    will send our info to post from the Spotify API */}
                    <button onClick={sliceAndSend}>Import Playlist</button>
                </>}
            {/* if we have selected a playlist_id, we'll render the masterlist for it here */}
            {currentList > 0 &&
                <table>
                    <thead>
                        <tr>
                            <td>Track</td>
                            <td>Album</td>
                        </tr>
                    </thead>
                    <tbody>
                        {masterlist.map(track => {
                            return (
                                <tr key={track.id}>
                                    <td>{track.track}</td>
                                    <td>{track.album}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
    )
}