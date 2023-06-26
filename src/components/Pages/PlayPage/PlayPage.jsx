import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function PlayPage() {

    // stick 'em up! gimme your WHOLE STORE
    const masterlist = useSelector(store => store.masterlist);
    const panelUsers = useSelector(store => store.toplist.panelUserReducer);
    const toplist = useSelector(store => store.toplist.toplistReducer);
    const gamelist = useSelector(store => store.game);
    const user = useSelector(store => store.user);
    const currentList = useSelector(store => store.currentList)

    const dispatch = useDispatch();

    // local state for Empty Trash button
    const [trashed, setTrashed] = useState(false);

    useEffect(() => {
        dispatch({
            type: "FETCH_MASTERLIST",
            payload: {
                playlist_id: currentList
            }
        });
        dispatch({
            type: "FETCH_PANEL_USERS",
            payload: {
                playlist_id: currentList
            }
        })
        dispatch({
            type: "FETCH_GAMELIST",
            payload: {
                playlist_id: currentList
            }
        })
    }, []);

    // declaring intervalId to use for setInterval function
    // let intervalId;

    const gameMode = (status) => {
        console.log(currentList)
        // status variable contains a string indicating whether to START the game by setting
        // game_mode === true, or STOP the game by setting game_mode === false.
        if (status === "START") {

            dispatch({
                type: "GAME_MODE",
                payload: {
                    playlist_id: currentList,
                    switch: status
                }
            })

            // intervalId = setInterval(
            //     dispatch({
            //         type: "FETCH_GAMELIST",
            //         payload: {
            //             playlist_id: currentList
            //         }
            //     }), 5000)

        } else if (status === "STOP") {

            // clearInterval(intervalId)

            dispatch({
                type: "GAME_MODE",
                payload: {
                    playlist_id: currentList,
                    switch: status
                }
            })
        }
    }

    // onClick for users to mark selected song as is_played === true
    const playSong = (masterlist_id) => {
        console.log({ masterlist_id });

        dispatch({
            type: "PLAY_SONG",
            payload: {
                masterlist_id,
                playlist_id: currentList
            }
        })
    }

    console.log(currentList);

    return (
        <div>
            {/* admin features */}
            {user.is_admin &&
                <div>
                    {masterlist.length > 0 && masterlist[0].game_mode
                        ? <>
                        {/* if our masterlist is populated and game_mode is true, display these.
                        First button below is the button to Stop the game */}
                            <button onClick={() => gameMode("STOP")} >End Game</button>
                            {/* this button will set the game list to render only songs with a tally of 2 or more */}
                            <button onClick={() => setTrashed(true)} >Empty Trash</button>
                        </>
                        // Button to 
                        : <button onClick={() => gameMode("START")} >Start Game</button>
                    }
                </div>
            }
            {/* below is everything that will display for users once the admin has marked this masterlist's game_mode as TRUE */}
            {masterlist.length > 0 && masterlist[0].game_mode === true
                ? <>
                    <div>
                        <h2>{masterlist[0].artist}</h2>
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
                                 {/* once our toplist store has populated, render it into this table */}
                                {toplist.length > 0 &&
                                    toplist.map(track => {
                                        return (
                                            !track.hidden &&
                                            <tr key={track.id}>
                                                <td>{track.track}</td>
                                                <td>{track.album}</td>
                                                <td>{track.notes}</td>
                                                {track.is_played
                                                    ? <td></td>
                                                    : <td><button
                                                        onClick={() => playSong(track.masterlist_id)}
                                                    >Play</button></td>}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <br />
                    <div>
                        {/* once we've added to our gamelist, start rendering our table */}
                        {gamelist.length > 0 &&
                            <table>
                                <thead>
                                    <tr>
                                        <td>Track</td>
                                        <td>Album</td>
                                        <td>Total</td>
                                        {panelUsers.length > 0 &&
                                            panelUsers.map(user => {
                                                return (
                                                    <td key={user.id}>{user.username}</td>
                                                )
                                            })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* if the "Empty Trash" button has been clicked, only items with a total tally greater than 1 will render. */}
                                    { trashed
                                        ? gamelist.map(track => {
                                            return (
                                                track.result.total > 1 &&
                                                <tr key={track.track} >
                                                    <td>{track.track}</td>
                                                    <td>{track.album}</td>
                                                    {Object.values(track.result).map(result => {
                                                        return (<td>{result}</td>)
                                                    })}
                                                </tr>
                                            )
                                        })
                                        : gamelist.map(track => {
                                            return (
                                                <tr key={track.track} >
                                                    <td>{track.track}</td>
                                                    <td>{track.album}</td>
                                                    {Object.values(track.result).map(result => {
                                                        return (<td>{result}</td>)
                                                    })}
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        }
                    </div>
                </>
                : <>
                {/* if you visit this page outside of gameplay, this will be the message */}
                    <div>
                        <h3>Come back on {masterlist.length > 0 && moment(masterlist[0].recording_date).format('MM/DD/YYYY') || "the date of recording"} to play {masterlist.length > 0 && masterlist[0].artist || "the game"}!</h3>
                    </div>
                </>
            }
        </div >
    )
}