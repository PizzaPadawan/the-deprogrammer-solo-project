import { useDispatch } from "react-redux";

import MasterList from "./MasterList";
import PanelUsers from "./PanelUsers";

import { Grid } from "@mui/material";

export default function PanelEditor() {

    // useEffect(() => {
    //     dispatch({ type: "FETCH_PANELS" });
    //     console.log("effecting your use, dude")
    // }, [])

    // Redux
    const dispatch = useDispatch();

    return (
        <Grid container>
            <Grid item>
                <PanelUsers />
            </Grid>
            <Grid item>
                <MasterList />
            </Grid>
        </Grid>
    )
}