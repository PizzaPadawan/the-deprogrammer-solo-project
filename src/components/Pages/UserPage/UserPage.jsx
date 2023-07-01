import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

//MUI
import {
  IconButton,
  Tooltip,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Grid,
  Paper,
  Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material';
//MUI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';


function UserPage() {

  // instantiate hooks
  const user = useSelector((store) => store.user);
  const panels = useSelector((store) => store.toplist.panelReducer);
  const toplist = useSelector((store) => store.toplist.toplistReducer);
  const dispatch = useDispatch();

  // fetching panels on page load to show Upcoming Panels list
  useEffect(() => {
    dispatch({ type: 'FETCH_PANELS' });
  }, []);

  // function to set our currentList Redux store to the currently selected "playlist_id"
  const setCurrentList = (playlistId) => {
    dispatch({
      type: "SET_CURRENT_LIST",
      payload: playlistId
    })
  }

  // click listener to fetch the toplist and set our current list to the playlist_id we want
  const fetchToplist = (playlist_id) => {
    setCurrentList(playlist_id)
    dispatch({ type: 'FETCH_TOPLIST', payload: { playlist_id } })
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
    // grey stripe every odd-numbered row
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // create variable to check if selected toplist is complete
  let toplistComplete;

  // change toplistComplete variable based on whether or not the user has narrowed it down to 20 songs
  if (toplist.length > 0 && toplist[20].hidden === true) {
    toplistComplete = true;
  } else if (toplist.length === 0 || (toplist.length > 0 && toplist[20].hidden) === false) {
    toplistComplete = false
  }

  return (
    !toplist.length > 0

      ?
      // center our "Upcoming Panels" table if we haven't currently selected a toplist preview
      // maxWidth="md" makes our Container smaller than normal so we can fit it and make it uniform to how the 
      // table looks when a toplist preview is rendered
      <Container maxWidth="md">
        <Grid container
          width="80%"
          m='auto'>
          {/* xs={12} makes it so that this Grid item takes up the entire Grid container */}
          <Grid item xs={12}>
            <Typography variant="h5" color="warning.light" sx={{ pt: 3 }}>Welcome, {user.username}!</Typography>
            <Paper sx={{ mt: 3 }}>
              {/* Panels table */}
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table>
                  <TableHead>
                    {/*'Upcoming Panels' title cell spans the whole table */}
                    <StyledTableRow>
                      <StyledTableCell colSpan={4} sx={{ borderBottom: 0 }}>Upcoming Panels</StyledTableCell>
                    </StyledTableRow>
                    {/* 2nd header row with column titles */}
                    <StyledTableRow>
                      <StyledTableCell>Artist</StyledTableCell>
                      <StyledTableCell>Panel</StyledTableCell>
                      <StyledTableCell sx={{ width: 125 }}>Recording Date</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {/* mapping over our panels store to show upcoming panels the user is a part of */}
                    {panels.map(panel => {
                      return (
                        // conditional rendering to only return panels with recording_date greater than or equal to today's date
                        moment(panel.recording_date).format('YYYY/MM/DD') > moment().subtract(1, 'days').format('YYYY/MM/DD') &&
                        // maps over panel object to show the artist, list of users, and recording date (formatted with moment.js)
                        <StyledTableRow key={panel.playlist_id}>
                          <StyledTableCell>{panel.artist}</StyledTableCell>
                          <StyledTableCell>{panel.users}</StyledTableCell>
                          <StyledTableCell>{moment(panel.recording_date).format('MM/DD/YYYY')}</StyledTableCell>
                          <StyledTableCell>
                            {/* Tooltip to avoid ambiguity with IconButton */}
                            <Tooltip title="Show your top songs list">
                              {/* Shows preview of selected toplist */}
                              <IconButton onClick={() => fetchToplist(panel.playlist_id)}>
                                <VisibilityOffIcon />
                              </IconButton>
                            </Tooltip>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      :

      <Container maxWidth='xl'>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5" color="warning.light" sx={{ pt: 3 }}>Welcome, {user.username}!</Typography>
            <Paper sx={{ mt: 3 }}>
              {/* Panels table */}
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table>
                  <TableHead>
                    {/*'Upcoming Panels' title cell spans the whole table */}
                    <StyledTableRow>
                      <StyledTableCell colSpan={4} sx={{ borderBottom: 0 }}>Upcoming Panels</StyledTableCell>
                    </StyledTableRow>
                    {/* 2nd header row with column titles */}
                    <StyledTableRow>
                      <StyledTableCell>Artist</StyledTableCell>
                      <StyledTableCell>Panel</StyledTableCell>
                      <StyledTableCell sx={{ width: 125 }}>Recording Date</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: 'center' }} ></StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {/* mapping over our panels store to show upcoming panels the user is a part of */}
                    {panels.map(panel => {
                      return (
                        // conditional rendering to only return panels with recording_date greater than or equal to today's date
                        moment(panel.recording_date).format('YYYY/MM/DD') > moment().subtract(1, 'days').format('YYYY/MM/DD')
                          // maps over panel object to show the artist, list of users, and recording date (formatted with moment.js)
                          ? <StyledTableRow key={panel.playlist_id}>
                            <StyledTableCell>{panel.artist}</StyledTableCell>
                            <StyledTableCell>{panel.users}</StyledTableCell>
                            <StyledTableCell>{moment(panel.recording_date).format('MM/DD/YYYY')}</StyledTableCell>
                            {panel.playlist_id === toplist[0].playlist_id
                              // first, check if this is the currently selected toplist
                              ? toplistComplete
                                // then, check to see if this meets the toplistComplete criteria.
                                // if so, render the VisibilityIcon in green
                                ? <Tooltip title="Top 20 complete!">
                                <StyledTableCell>
                                  {/* Hides toplist preview onClick and returns Upcoming Panels table to center of screen */}
                                  <IconButton color="success" onClick={() => fetchToplist(0)}>
                                    <VisibilityIcon />
                                  </IconButton>
                                </StyledTableCell>
                                </Tooltip>
                                // if not, render it in the default orange
                                : <Tooltip title="Top 20 in progress">
                                <StyledTableCell>
                                  {/* Hides toplist preview onClick and returns Upcoming Panels table to center of screen */}
                                  <IconButton color="warning" onClick={() => fetchToplist(0)}>
                                    <VisibilityIcon />
                                  </IconButton>
                                </StyledTableCell>
                                </Tooltip>
                              // if it's not the currently selected toplist, show the VisibilityOffIcon
                              : <StyledTableCell>
                                {/* Shows preview of selected toplist onClick */}
                                <IconButton onClick={() => fetchToplist(panel.playlist_id)}>
                                  <VisibilityOffIcon />
                                </IconButton>
                              </StyledTableCell>
                            }
                          </StyledTableRow>
                          // if the recording_date has passed, hide the list to avoid clutter
                          : null
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={6}>
            {/* Preview of currently selected toplist */}
            {toplist.length > 0
              ? <Paper sx={{ mt: 10 }}>
                <TableContainer sx={{ maxHeight: 400 }} >
                  <Table stickyHeader>
                    <TableHead>
                      {/* Table "title" header row */}
                      <StyledTableRow>
                        {/* Artist name spans 2 columns */}
                        <TableCell
                          colSpan={2}
                          sx={{
                            borderBottom: 0,
                            backgroundColor: 'black',
                            color: '#f57c00'
                          }}
                        >{`Your current list for ${toplist[0].artist}`}</TableCell>
                        {/* shows recording date */}
                        <TableCell
                          align='right'
                          sx={{
                            borderBottom: 0,
                            backgroundColor: 'black',
                            color: '#ab47bc'
                          }}
                        >{moment(toplist[0].recording_date).format('MM/DD/YYYY')}</TableCell>
                      </StyledTableRow>
                      <StyledTableRow>
                        <StyledTableCell sx={{ textAlign: 'center' }} ><FormatListNumberedIcon /></StyledTableCell>
                        <StyledTableCell sx={{ width: 300 }}>Track</StyledTableCell>
                        <StyledTableCell>Album</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {toplist.map((track, index) => {
                        return (
                          // Only show tracks that are currently selected for the toplist (hidden === false)
                          !track.hidden &&
                          <StyledTableRow key={track.id}>
                            {/* Index number in first row to show how many songs are selected, then map over track and album */}
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{track.track}</StyledTableCell>
                            <StyledTableCell>{track.album}</StyledTableCell>
                          </StyledTableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
              : null
            }
          </Grid>
        </Grid>
      </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
