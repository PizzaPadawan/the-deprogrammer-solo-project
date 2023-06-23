import { useDispatch } from "react-redux";

import MasterList from "./MasterList";
import PanelUsers from "./PanelUsers";

export default function PanelEditor() {

    // useEffect(() => {
    //     dispatch({ type: "FETCH_PANELS" });
    //     console.log("effecting your use, dude")
    // }, [])

    // Redux
    const dispatch = useDispatch();

    return (
        <div>
            <PanelUsers/>
            <br />
            <MasterList />
        </div>
    )
}