import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function PanelUsers({currentList}) {

    // Redux
    const dispatch = useDispatch();
    const panelUsers = useSelector(store => store.toplist.panelUserReducer);

    // local state
    const [username, setUsername] = useState('');

    // dispatch to add new user to selected panel
    const addUser = () => {
        //validation
        if(!username || !currentList){
            alert("Please enter a valid username and select a panel")
            return;
        }
        console.log({currentList, username})
        dispatch({type: "ADD_USER", payload: {list_id: currentList, username} })
        dispatch({type: 'FETCH_PANEL_USERS', payload: {playlist_id: currentList}})
    }
    

    return (
        <div>
            {/* input to add new user to panel */}
            <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={e => setUsername(e.target.value)} />
            <button
            onClick={addUser}
            >Add to Panel</button>
            <br />
            {/* table to display currently selected panel */}
            <table>
                <thead>
                    <tr>
                        <td>Current Panel</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {panelUsers.length > 0 &&
                        panelUsers.map(user => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.username}</td>
                                    <td><button>Remove</button></td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
}