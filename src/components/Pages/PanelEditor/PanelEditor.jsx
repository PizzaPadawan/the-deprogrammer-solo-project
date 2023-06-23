import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import MasterList from "./MasterList";
import PanelUsers from "./PanelUsers";

export default function PanelEditor({currentList, setCurrentList}) {

    useEffect(() => {
        dispatch({ type: "FETCH_PANELS" });
        console.log(currentList)
    }, [])



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