import { useSelector } from "react-redux";
// components
import MasterList from "./MasterList";
import PanelUsers from "./PanelUsers";
// MUI
import { Grid, Container } from "@mui/material";

export default function PanelEditor() {

    const masterlist = useSelector(store => store.masterlist)

    return (
        <Container>
            {/* If a masterlist isn't populated, center the Masterlist component 
            (This makes sense because the default of the Masterlist component is the inputs to 
            import a new list) */}
            { masterlist.length > 0
                ?<Grid container>
                    <Grid item xs={4}>
                        <PanelUsers />
                    </Grid>
                    <Grid item xs={8}>
                        <MasterList />
                    </Grid>
                </Grid>
                : <MasterList/>
            }
        </Container>
    )
}