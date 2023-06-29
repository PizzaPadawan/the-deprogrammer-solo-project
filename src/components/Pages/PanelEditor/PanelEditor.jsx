import { useSelector } from "react-redux";

import MasterList from "./MasterList";
import PanelUsers from "./PanelUsers";

import { Grid, Container } from "@mui/material";

export default function PanelEditor() {

    const masterlist = useSelector(store => store.masterlist)

    return (
        <Container>
            { masterlist[0]
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