import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import moment from "moment";

//MUI
import {
    TextField,
    Button,
    IconButton,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Paper,
    Container,
    Grid,
    Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material';
// Icons
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import UploadIcon from '@mui/icons-material/Upload';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

export default function MasterList() {

    useEffect(() => {
        dispatch({ type: 'FETCH_PANELS' });
    }, []);

    // Redux 
    const dispatch = useDispatch();
    const masterlist = useSelector(store => store.masterlist);
    const panels = useSelector(store => store.toplist.panelReducer);
    const currentList = useSelector(store => store.currentList)

    // local state
    const [newDate, setNewDate] = useState('');
    const [playlistURL, setPlaylistURL] = useState('');
    const [editDateMode, setEditDateMode] = useState(false);
    const [playlistId, setPlaylistId] = useState(0)


    // retreive our masterlist, enter dispatch hell
    const fetchMasterlist = (playlist_id) => {
        //but only if there's actually a value there, duh
        dispatch({ type: 'SET_CURRENT_LIST', payload: playlist_id })
        dispatch({ type: 'FETCH_MASTERLIST', payload: { playlist_id } })
        dispatch({ type: 'FETCH_PANEL_USERS', payload: { playlist_id } })
    }

    // .slice the correct value out of the provided url for the spotify_id
    const sliceAndSend = () => {
        if (!playlistURL) {
            alert("Please enter a playlist URL");
            return;
        }
        // cuts out the 22-character spotify ID and sends it to be input on the spotify POST
        let spotifyID = playlistURL.slice(34, 56);
        dispatch({
            type: "POST_MASTERLIST",
            payload: {
                spotify_id: spotifyID,
                recording_date: newDate
            }
        });
        setNewDate('');
        setPlaylistURL('');
    }

    const postNewDate = () => {
        // validate so user doesn't send empty data
        if (!newDate) {
            alert("Please enter new date before saving")
            return;
        }
        // dispatch to send newDate to current playlist_id
        dispatch({
            type: "UPDATE_RECORDING_DATE",
            payload: {
                playlist_id: currentList,
                recording_date: newDate
            }
        })
        // reset our local state
        setEditDateMode(false);
        setNewDate('');

    }

    // custom MUI table styles
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

    return (
        <Container >
            <Paper sx={{ p: 3, my: 5 }}>
                <Grid container>
                    <Grid item xs={5}>
                        {/* this dropdown will allow the admin to select the masterlist to view */}
                        <TextField
                            sx={{ width: '70%' }}
                            select
                            size="small"
                            value={playlistId}
                            label="Select an Artist"
                            onChange={e => setPlaylistId(e.target.value)}>
                            <MenuItem value={0} >Add New List</MenuItem>
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
                        {/* confirmation button to set our displayed masterlist to the currentList set by the select menu above */}
                        <IconButton
                            variant="contained"
                            color="warning"
                            sx={{ ml: 1 }}
                            onClick={() => fetchMasterlist(playlistId)}>
                            <ThumbUpAltIcon />
                        </IconButton>
                    </Grid>

                    {masterlist.length > 0 && currentList && masterlist[0].recording_date
                        // if we've clicked on the currently displayed date to change it,
                        // we want to render the TextField and Buttons necessary to send new data
                        ? editDateMode

                            ? <Grid item xs={7}>
                                {/* TextField to set newDate value */}
                                <TextField
                                    sx={{ mb: 3, width: '50%' }}
                                    size="small"
                                    type="text"
                                    placeholder={moment(masterlist[0].recording_date).format('MM/DD/YYYY')}
                                    value={newDate}
                                    onChange={e => setNewDate(e.target.value)}
                                />
                                {/* button to post new date to our masterlist */}
                                <IconButton
                                    sx={{ mx: 1 }}
                                    variant="contained"
                                    color="warning"
                                    onClick={postNewDate} >
                                    <SaveIcon />
                                </IconButton>
                                {/* Button to exit editDateMode without saving changes */}
                                <IconButton
                                    variant="contained"
                                    color="warning"
                                    onClick={() => setEditDateMode(false)}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>

                            // if not, display the current recording_date for this masterlist
                            : <>
                                <Grid item sx={{ mx: 1 }} xs={4}>
                                    <Typography variant="body1" align="right" mt={1} >{moment(masterlist[0].recording_date).format('MM/DD/YYYY')}</Typography>
                                </Grid>
                                <Grid item sx={{ mb: 3 }} xs={2} >
                                    <Button
                                        variant="text"
                                        color="warning"
                                        onClick={() => setEditDateMode(true)}>
                                        Edit Date
                                    </Button>
                                </Grid>
                            </>

                        // if we're not currently displaying a masterlist, this will be the TextField
                        // to add a date for the new list we'll be importing.
                        : <Grid item sx={{ mb: 3, mr: 1 }} xs={2} >
                            <TextField
                                size="small"
                                label="Date"
                                helperText="Recording date"
                                value={newDate}
                                onChange={e => setNewDate(e.target.value)}
                            />
                        </Grid>
                    }


                    {/* we only want this to try render if we haven't selected a valid masterlist.
                    this will be our TextField field and button to add a spotify playlist link */}
                    {!masterlist[0] &&
                        <Grid item xs={4}>
                            <TextField
                                size="small"
                                label="URL"
                                helperText="Paste your Spotify playlist URL"
                                value={playlistURL}
                                onChange={e => setPlaylistURL(e.target.value)}
                            />
                            {/* after setting local state with our playlist url TextField, clicking this button
                            will send our info to post from the Spotify API */}
                            <IconButton
                                variant="contained"
                                color="warning"
                                sx={{ mx: 1 }}
                                onClick={sliceAndSend}>
                                <UploadIcon />
                            </IconButton>
                        </Grid>
                    }

                    <Grid item xs={12}>
                        {/* if we have selected a playlist_id, we'll render the masterlist for it here */}
                        {masterlist.length > 0 &&
                            <TableContainer sx={{ maxHeight: 400 }}>
                                <Table stickyHeader >
                                    <TableHead>
                                        {/* Table title row */}
                                        <StyledTableRow>
                                            <TableCell
                                                colSpan={3}
                                                sx={{
                                                    borderBottom: 0,
                                                    backgroundColor: 'black',
                                                    color: '#f57c00'
                                                }}
                                            >
                                                {masterlist[0].artist}
                                            </TableCell>
                                        </StyledTableRow>
                                        {/* Column title row */}
                                        <StyledTableRow >
                                            <StyledTableCell><FormatListNumberedIcon /></StyledTableCell>
                                            <StyledTableCell>Track</StyledTableCell>
                                            <StyledTableCell>Album</StyledTableCell>
                                        </StyledTableRow >
                                    </TableHead>
                                    <TableBody>
                                        {masterlist.map((track, index) => {
                                            return (
                                                <StyledTableRow key={track.id}>
                                                    {/* index to show number of tracks in masterlist */}
                                                    <StyledTableCell>{index + 1}</StyledTableCell>
                                                    <StyledTableCell>{track.track}</StyledTableCell>
                                                    <StyledTableCell>{track.album}</StyledTableCell>
                                                </StyledTableRow >
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}