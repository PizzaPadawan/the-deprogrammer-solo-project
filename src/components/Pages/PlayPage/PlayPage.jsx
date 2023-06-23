import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PlayPage({ currentList }) {

    // stick 'em up! gimme your WHOLE STORE
    const masterlist = useSelector(store => store.masterlist);
    const panels = useSelector(store => store.toplist.panelReducer);
    const panelUsers = useSelector(store => store.toplist.panelUserReducer);
    const toplist = useSelector(store => store.toplist.toplistReducer);
    const gamelist = useSelector(store => store.game);
    const user = useSelector(store => store.user);

    return (
        <div>
            {user.is_admin &&
                <div>
                    {masterlist.length > 0 && masterlist[0].game_mode
                        ? <>
                            <button >End Game</button>
                            <button >Discussion</button>
                            <button >Empty Trash</button>
                        </>
                        : <button >Start Game</button>
                    }
                </div>
            }
            <div>
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
                                        <td><button>Play</button></td>
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
            <div>
                { gamelist.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <td>Track</td>
                            <td>Album</td>
                            <td>Total</td>
                            {panelUsers.map(user => {
                                return(
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
                                    {track.result.map(tally => {
                                        <td>{tally}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                }
            </div>
        </div>
    )

}