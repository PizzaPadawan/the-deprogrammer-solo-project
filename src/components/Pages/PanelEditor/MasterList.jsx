import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import moment from "moment";


export default function MasterList({currentList, setCurrentList}) {

    // Redux 
    const dispatch = useDispatch();
    const toplist = useSelector(store => store.toplist.toplistReducer);
    const panels = useSelector(store => store.toplist.panelReducer);

    // local state
    const [newDate, setNewDate] = useState('');

    // gimmedatoplist
    const fetchToplist = (playlist_id) => {
        //but only if there's actually a value there, duh
        if (!currentList) {
            alert("Please select an active panel to view masterlist")
            return;
        }
        dispatch({ type: 'FETCH_TOPLIST', payload: { playlist_id } })
        dispatch({ type: 'FETCH_PANEL_USERS', payload: { playlist_id } })
    }

    return (
        <div>
            <select
                value={currentList}
                onChange={e => setCurrentList(e.target.value)}>
                <option>Select a panel</option>
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
            <button onClick={() => fetchToplist(currentList)} >Select</button>
            {toplist.length > 0 && currentList &&
                toplist[0].recording_date
                ? <h4>{moment(toplist[0].recording_date).format('MM/DD/YYYY')}</h4>
                : <input
                    type="text" />}
            <table>
                <thead>
                    <tr>
                        <td>Track</td>
                        <td>Album</td>
                    </tr>
                </thead>
                <tbody>
                    {toplist.length > 0 && currentList && 
                        toplist.map(track => {
                            return (
                                <tr key={track.id}>
                                    <td>{track.track}</td>
                                    <td>{track.album}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}