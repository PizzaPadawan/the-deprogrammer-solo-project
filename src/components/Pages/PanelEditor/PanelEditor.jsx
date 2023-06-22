import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import MasterList from "./MasterList";
import PanelUsers from "./PanelUsers";

export default function PanelEditor() {

    useEffect(() => {
        dispatch({ type: "FETCH_PANELS" });
        console.log(currentList)
    }, [])

    //local state
    const [currentList, setCurrentList] = useState('');

    // Redux
    const dispatch = useDispatch();


    return (
        <div>
            <PanelUsers currentList={currentList}/>
            <br />
            <MasterList currentList={currentList} setCurrentList={setCurrentList}/>
        </div>
    )
}