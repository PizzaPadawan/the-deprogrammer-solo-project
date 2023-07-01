import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import moment from "moment";
import EditDialog from "./EditDialog";

//MUI
import {
    Button,
    IconButton,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Container,
    Paper,
    TextField,
    MenuItem,
    Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material';
// MUI Icons
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateIcon from '@mui/icons-material/Create';

export default function ListEditor() {

    useEffect(() => {
        dispatch({ type: 'FETCH_PANELS' });
    }, []);

    // Redux
    const dispatch = useDispatch();
    const panels = useSelector((store) => store.toplist.panelReducer);
    const toplist = useSelector((store) => store.toplist.toplistReducer);
    const currentList = useSelector(store => store.currentList)

    // local state
    const [selectedTrack, setSelectedTrack] = useState('');
    const [selectedTrackID, setSelectedTrackID] = useState('');
    const [open, setOpen] = useState(false);

    // Custom MUI components
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 13,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 13,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // putting the currently selected list in Redux state
    const setCurrentList = (playlistId) => {
        // keep our current list in our Redux store to reference across components
        dispatch({
            type: "SET_CURRENT_LIST",
            payload: playlistId
        })
    }

    // fetching our new toplist based on id sent
    const fetchToplist = (playlist_id) => {
        // validation
        if (!currentList || currentList === "Select an artist") {
            alert("Please select an active panel to view toplist")
            return;
        }

        dispatch({ type: 'FETCH_TOPLIST', payload: { playlist_id } })
    }

    // updating status of the track on toplist
    const trackStatus = (toplist_id, status) => {
        //validation
        if (!toplist_id || !status || !currentList) {
            alert("Error changing track status");
            return;
        }

        dispatch({
            type: "TRACK_STATUS",
            payload: {
                toplist_id,
                switch: status,
                playlist_id: currentList
            }
        })
    }

    // Click handler for opening EditDialog
    const handleClickOpen = (track, trackID) => {
        setSelectedTrack(track);
        setSelectedTrackID(trackID);
        setOpen(true);
    };

    // Click handler for closing EditDialog
    const handleClose = () => {
        setSelectedTrack('')
        setSelectedTrackID('')
        setOpen(false);
    };

    // click handler to submit new track notes
    const editNote = (newNotes) => {
        // console.log(selectedTrack, selectedTrackID, newNotes)
        // validate inputs
        if (!newNotes) {
            alert("Please ensure you've entered a note before submitting.")
            return;
        }

        dispatch({
            type: "EDIT_NOTES",
            payload: {
                notes: newNotes,
                toplist_id: selectedTrackID,
                playlist_id: currentList
            }
        })
        // clear inputs, close Dialog
        setSelectedTrack('')
        setSelectedTrackID('')
        setOpen(false);
    }


    return (
        <Container >
            <Paper sx={{ my: 5, py: 3 }}>
                {/* Dialog box to edit notes per track */}
                <EditDialog
                    open={open}
                    handleClose={handleClose}
                    editNote={editNote}
                    selectedTrack={selectedTrack}
                />

                <Container sx={{ my: 3 }}>
                    {/* this dropdown allows the user to select between all artist they're on a panel for */}
                    <TextField
                        sx={{ width: '20%' }}
                        select
                        size="small"
                        value={currentList}
                        label="Select an Artist"
                        onChange={e => setCurrentList(e.target.value)}>
                        <MenuItem value={0} >Select an artist</MenuItem>
                        {/* if our panels store is populated, bring our available panels into the dropdown */}
                        {panels.length > 0 &&
                            panels.map(panel => {
                                return (
                                    // conditional rendering to only return panels with recording_date greater than or equal to today's date
                                    moment(panel.recording_date).format('YYYY/MM/DD') > moment().subtract(1, 'days').format('YYYY/MM/DD') &&
                                    <MenuItem
                                        key={panel.playlist_id}
                                        value={panel.playlist_id}
                                    >{panel.artist}</MenuItem>
                                );
                            })}
                    </TextField>

                    {/* this button allows the user to commit to displaying the artist selected from the dropdown */}
                    <Button variant="contained" color="warning" sx={{ mx: 1 }} onClick={() => fetchToplist(currentList)}>Select</Button>

                    {toplist.length > 0 &&
                        <>
                        {/* Recording Date header */}
                            <Typography
                                variant="h6"
                                align="right"
                                sx={{ mt: 2 }} >
                                Recording date: {moment(toplist[0].recording_date).format('MM/DD/YYYY')}
                            </Typography>
                            {/* Toplist table */}
                            <TableContainer sx={{ maxHeight: 500, my: 3 }}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <StyledTableRow >
                                            <StyledTableCell><FormatListNumberedIcon /></StyledTableCell>
                                            <StyledTableCell>Track</StyledTableCell>
                                            <StyledTableCell>Album</StyledTableCell>
                                            <StyledTableCell>Notes</StyledTableCell>
                                            <StyledTableCell></StyledTableCell>
                                            <StyledTableCell><PlaylistAddCheckIcon /></StyledTableCell>
                                        </StyledTableRow >
                                    </TableHead>
                                    <TableBody>
                                        {toplist.map((track, index) => {
                                            return (
                                                track.hidden
                                                    // Grey out the track row if this track has been 'removed' (hidden=true) from the top list,
                                                    // and remove the Edit Notes button
                                                    ? <TableRow sx={{ backgroundColor: "darkgray" }} key={track.id}>
                                                        {/* index row to show number of songs on list */}
                                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                                        <StyledTableCell>{track.track}</StyledTableCell>
                                                        <StyledTableCell>{track.album}</StyledTableCell>
                                                        <StyledTableCell>{track.notes}</StyledTableCell>
                                                        <StyledTableCell></StyledTableCell>
                                                        <StyledTableCell>
                                                            {/* Button to add track back to toplist */}
                                                            <Tooltip title="Add To List">
                                                                <IconButton
                                                                    onClick={e => trackStatus(track.id, "SHOW")}
                                                                ><AddCircleIcon sx={{ color: 'white' }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </StyledTableCell>
                                                    </TableRow >
                                                    // if song is still on toplist, show as normal
                                                    : <StyledTableRow key={track.id}>
                                                        {/* index row to show number of songs on list */}
                                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                                        <StyledTableCell>{track.track}</StyledTableCell>
                                                        <StyledTableCell>{track.album}</StyledTableCell>
                                                        <StyledTableCell>{track.notes}</StyledTableCell>
                                                        {selectedTrack === track.track
                                                            // if this is the track with notes currently being edited, show CreateIcon
                                                            ? <StyledTableCell ><CreateIcon /></StyledTableCell>
                                                            // if this is not currently selected, show the EditNote IconButton to open EditDialog
                                                            : < StyledTableCell >
                                                                <Tooltip title="Edit Note">
                                                                    <IconButton
                                                                        onClick={() => { handleClickOpen(track.track, track.id) }}>
                                                                        <EditNoteIcon />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </StyledTableCell>
                                                        }
                                                        <StyledTableCell>
                                                            {/* Button to remove track from toplist */}
                                                            <Tooltip title="Remove From List">
                                                                <IconButton
                                                                    onClick={e => trackStatus(track.id, "HIDE")}
                                                                ><RemoveCircleIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </StyledTableCell>
                                                    </StyledTableRow >
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    }
                </Container>
            </Paper>
        </Container >
    )
}