import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

export default function PanelUsers() {

    // Redux
    const dispatch = useDispatch();
    const panelUsers = useSelector(store => store.toplist.panelUserReducer);
    const currentList = useSelector(store => store.currentList)

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
        dispatch({type: "ADD_USER", payload: {playlist_id: currentList, username} })
        setUsername('')
    }

    const removeUser = (user_id) => {
        if(!currentList){
            return;
        }
        console.log({user_id, playlist_id: currentList});
        dispatch({type: "REMOVE_USER", payload: {user_id, playlist_id: currentList}});
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
                                    <td><button
                                    onClick={() => removeUser(user.id)}
                                    >Remove</button></td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    )
}