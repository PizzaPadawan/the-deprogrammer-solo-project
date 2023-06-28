import { useSelector } from "react-redux";

import MasterList from "./MasterList";
import PanelUsers from "./PanelUsers";

import { Grid, Container } from "@mui/material";

export default function PanelEditor() {

    const currentList = useSelector(store => store.currentList)

    return (
        <Container>
            { currentList
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