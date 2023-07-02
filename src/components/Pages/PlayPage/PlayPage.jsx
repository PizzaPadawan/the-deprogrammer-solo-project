import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
//MUI
import {
    Button,
    IconButton,
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
//Icons
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function PlayPage() {

    // Redux
    // stick 'em up! gimme your WHOLE STORE
    const masterlist = useSelector(store => store.masterlist);
    const toplist = useSelector(store => store.toplist.toplistReducer);
    const gamelist = useSelector(store => store.game);
    const user = useSelector(store => store.user);
    const currentList = useSelector(store => store.currentList)
    const dispatch = useDispatch();

    // instantiating useRef for setInterval
    const intervalRef = useRef(null);

    // useEffect dependent on masterlist store state to: 
    // fire setInterval if our masterlist is in game_mode = true,
    // and clearInterval if changed to false
    useEffect(() => {
        // activates our setInterval to dispatch Game List and Masterlist every 2 seconds if our current masterlist is set to game_mode === true
        // This makes it so our Game List will update in "real time" for every user
        intervalRef.current = setInterval(() => {
            if (masterlist.length > 0 && masterlist[0].game_mode) {
                dispatch({
                    type: "FETCH_GAMELIST",
                    payload: {
                        playlist_id: currentList
                    }
                });
                dispatch({
                    type: "FETCH_MASTERLIST",
                    payload: {
                        playlist_id: currentList
                    }
                });
                dispatch({
                    type: "FETCH_TOPLIST",
                    payload: {
                        playlist_id: currentList
                    }
                });
            }
        }, 2000);

        // clears our setInterval if the conditional above is not met
        return () => {
            clearInterval(intervalRef.current);
        };
        // dependent on the change of masterlist store
    }, [masterlist])

    // page load dispatches
    useEffect(() => {
        dispatch({
            type: "FETCH_MASTERLIST",
            payload: {
                playlist_id: currentList
            }
        });
        dispatch({
            type: "FETCH_PANEL_USERS",
            payload: {
                playlist_id: currentList
            }
        })
        dispatch({
            type: "FETCH_GAMELIST",
            payload: {
                playlist_id: currentList
            }
        })

    }, []);



    const gameMode = (status) => {
        // status variable contains a string indicating whether to START the game by setting
        // game_mode === true, or STOP the game by setting game_mode === false.
        if (status === "START") {
            dispatch({
                type: "GAME_MODE",
                payload: {
                    playlist_id: currentList,
                    switch: status
                }
            })
        } else if (status === "STOP") {
            dispatch({
                type: "GAME_MODE",
                payload: {
                    playlist_id: currentList,
                    switch: status
                }
            })
        }
    }

    // onClick for users to mark selected song as is_played === true
    const playSong = (masterlist_id) => {

        dispatch({
            type: "PLAY_SONG",
            payload: {
                masterlist_id,
                playlist_id: currentList
            }
        })
    }

    // custom MUI table styles
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
            fontSize: 11,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 11,
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
        <Container maxWidth="xl">
            <Paper sx={{ p: 3, my: 5 }}>
                <Grid container spacing={2}>

                    {/* Display artist name as page header if our masterlist is populated and in game mode */}
                    {masterlist.length > 0 && masterlist[0].game_mode === true &&
                        <Grid item xs={11}>
                            <Typography
                                variant="h4"
                                component="h2"
                                align="left"
                            >{masterlist[0].artist}
                            </Typography>
                        </Grid>
                    }

                    {/* admin features */}
                    {user.is_admin &&
                        <Grid item xs={1}>
                            {masterlist.length > 0 && masterlist[0].game_mode
                                ? <>
                                    {/* if our masterlist is populated and game_mode is true, display these.
                                    First button below is the button to Stop the game */}
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => gameMode("STOP")}
                                    >STOP<StopIcon />
                                    </Button>
                                </>
                                // Button to Start the game
                                : <Button
                                    variant="contained"
                                    color="warning"
                                    onClick={() => gameMode("START")}
                                >Start<PlayArrowIcon />
                                </Button>
                            }
                        </Grid>
                    }

                    {/* below is everything that will display for users once the admin has marked this masterlist's game_mode as TRUE */}
                    {masterlist.length > 0 && masterlist[0].game_mode === true
                        ? <>
                            {/* Toplist table */}
                            <Grid item xs={4}>
                                <TableContainer sx={{ maxHeight: 400 }}>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <StyledTableRow >
                                                <StyledTableCell>Track</StyledTableCell>
                                                <StyledTableCell>Album</StyledTableCell>
                                                <StyledTableCell>Notes</StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                            </StyledTableRow >
                                        </TableHead>
                                        <TableBody>
                                            {/* once our toplist store has populated, render it into this Table */}
                                            {toplist.length > 0 &&
                                                toplist.map(track => {
                                                    return (
                                                        !track.hidden
                                                            ? track.is_played
                                                                // tracks that have been played will be greyed out
                                                                ? <TableRow
                                                                    sx={{ backgroundColor: 'darkgray' }}
                                                                    key={track.id}>
                                                                    <TableCell sx={{ fontSize: 11 }} >{track.track}</TableCell>
                                                                    <TableCell sx={{ fontSize: 11 }}>{track.album}</TableCell>
                                                                    <TableCell sx={{ fontSize: 11 }} colSpan={2} >{track.notes}</TableCell>
                                                                </TableRow >
                                                                // regular display of toplist row
                                                                : <StyledTableRow key={track.id}>
                                                                    <StyledTableCell>{track.track}</StyledTableCell>
                                                                    <StyledTableCell>{track.album}</StyledTableCell>
                                                                    <StyledTableCell>{track.notes}</StyledTableCell>
                                                                    <StyledTableCell>
                                                                        {/* Button to mark a song as is_played === true */}
                                                                        <IconButton
                                                                            onClick={() => playSong(track.masterlist_id)}
                                                                        ><PlayArrowIcon />
                                                                        </IconButton>
                                                                    </StyledTableCell>
                                                                </StyledTableRow >
                                                            // Don't display users' hidden toplist tracks 
                                                            : null
                                                    )
                                                })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            {/* Game list table */}
                            <Grid item xs={8}>
                                {/* once we've started marking tracks as is_played === true, 
                                they will be added to our gamelist and our Table will render */}
                                {gamelist.length > 0 &&
                                    <TableContainer sx={{ maxHeight: 400 }}>
                                        <Table stickyHeader >
                                            <TableHead>
                                                <StyledTableRow >
                                                    <StyledTableCell>Track</StyledTableCell>
                                                    <StyledTableCell>Album</StyledTableCell>
                                                    {/* return the result object keys as an array, then map over them to return result column titles */}
                                                    {Object.keys(gamelist[0].result).map((result, index) => {
                                                        return (<StyledTableCell key={index}>{result}</StyledTableCell>)
                                                    })}
                                                </StyledTableRow >
                                            </TableHead>
                                            <TableBody>
                                                {/* map over each track in our gamelist so it populates as songs are played */}
                                                {gamelist.map(track => {
                                                    return (
                                                        <StyledTableRow key={track.track} >
                                                            <StyledTableCell>{track.track}</StyledTableCell>
                                                            <StyledTableCell>{track.album}</StyledTableCell>
                                                            {/* return the result object values as an array, then map over them to return result numbers */}
                                                            {Object.values(track.result).map((result, index) => {
                                                                return (<StyledTableCell key={index}>{result}</StyledTableCell>)
                                                            })}
                                                        </StyledTableRow >
                                                    )
                                                })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                }
                            </Grid>
                        </>

                        : <>
                            {/* if you visit this page outside of gameplay, this will be the message */}
                            <Grid item>
                                <Typography variant="h5">
                                    Come back on {masterlist.length > 0 && moment(masterlist[0].recording_date).format('MM/DD/YYYY') || "the date of recording"} to play {masterlist.length > 0 && masterlist[0].artist || "the game"}!
                                </Typography>
                                <Typography variant="caption" >OR go back to your "EDIT" screen and select the band you'll be playing the game for.</Typography>
                            </Grid>
                        </>
                    }
                </Grid>
            </Paper>
        </Container >
    )
}