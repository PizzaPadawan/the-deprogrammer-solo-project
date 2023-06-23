import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

export default function PlayPage({ currentList }) {

    // stick 'em up! gimme your WHOLE STORE
    const masterlist = useSelector(store => store.masterlist);
    const panelUsers = useSelector(store => store.toplist.panelUserReducer);
    const toplist = useSelector(store => store.toplist.toplistReducer);
    const gamelist = useSelector(store => store.game);
    const user = useSelector(store => store.user);

    const dispatch = useDispatch();


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
            {user.is_admin &&
                <div>
                    {masterlist.length > 0 && masterlist[0].game_mode
                        ? <>
                            <button onClick={() => gameMode("STOP")} >End Game</button>
                            <button >Discussion</button>
                            <button >Empty Trash</button>
                        </>
                        : <button onClick={() => gameMode("START")} >Start Game</button>
                    }
                </div>
            }
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
                                {toplist.length > 0 && currentList
                                    ? toplist.map(track => {
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
                    <br />
                    <br />
                    <div>
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
                                    {gamelist.map(track => {
                                        return (
                                            <tr key={track.track} >
                                                <td>{track.track}</td>
                                                <td>{track.album}</td>
                                                {Object.values(track.result).map(result => {
                                                    return (<td>{result}</td>)
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </>
                : <>
                    <div>
                        <h3>Come back on {masterlist.length > 0 && moment(masterlist[0].recording_date).format('MM/DD/YYYY') || "the date of recording"} to play the game!</h3>
                    </div>
                </>
            }
        </div >
    )
}