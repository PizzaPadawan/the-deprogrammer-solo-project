import React from 'react';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

//MUI
import {
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Grid,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {tableCellClasses} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';



function UserPage() {

  // instantiate hooks
  const user = useSelector((store) => store.user);
  const panels = useSelector((store) => store.toplist.panelReducer);
  const toplist = useSelector((store) => store.toplist.toplistReducer);
  const currentList = useSelector(store => store.currentList)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PANELS' });
  }, []);

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
    <Grid container spacing={5} sx={{ ml: 1 }}>
      <Grid item xs={6}>
        <Typography variant="h5" color="warning.dark" sx={{ pt: 3 }}>Welcome, {user.username}!</Typography>
        <br />
        <Typography variant="h6" sx={{ pb: 3 }} >Upcoming Panels:</Typography>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Artist</StyledTableCell>
                  <StyledTableCell>Panel</StyledTableCell>
                  <StyledTableCell sx={{width:125}}>Recording Date</StyledTableCell>
                  <StyledTableCell sx={{textAlign:'center'}} ><VisibilityIcon /></StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {/* mapping over our panels store to show upcoming panels the user is a part of */}
                {panels.map(panel => {
                  return (
                    // conditional rendering to only return panels with recording_date greater than or equal to today's date
                    moment(panel.recording_date).format('YYYY/MM/DD') > moment().subtract(1, 'days').format('YYYY/MM/DD') &&
                    <StyledTableRow key={panel.playlist_id}>
                      <StyledTableCell>{panel.artist}</StyledTableCell>
                      <StyledTableCell>{panel.users}</StyledTableCell>
                      <StyledTableCell>{moment(panel.recording_date).format('MM/DD/YYYY')}</StyledTableCell>
                      <StyledTableCell><Button color="warning" onClick={() => fetchToplist(panel.playlist_id)}>Show</Button></StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <br />
      <Grid item>
        {/* if toplist store is populated, display the Artist and Recording Date of selected panel */}
        <Typography variant="h6" color="warning.dark" sx={{ pt: 3 }} >{toplist.length > 0 && toplist[0].artist}</Typography>
        <Typography variant="h6" color="secondary.dark" sx={{ pb: 2 }}>{toplist.length > 0 && moment(toplist[0].recording_date).format('MM/DD/YYYY')}</Typography>
        {toplist.length > 0
          ? <Paper>
            <TableContainer sx={{ maxHeight: 400, width: 600 }} >
              <Table stickyHeader>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell sx={{textAlign:'center'}} ><FormatListNumberedIcon/></StyledTableCell>
                    <StyledTableCell sx={{width: 300}}>Track</StyledTableCell>
                    <StyledTableCell>Album</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {toplist.map((track, index) => {
                    return (
                      !track.hidden &&
                      <StyledTableRow key={track.id}>
                        <StyledTableCell>{index+1}</StyledTableCell>
                        <StyledTableCell>{track.track}</StyledTableCell>
                        <StyledTableCell>{track.album}</StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          : <Paper>
          </Paper>
        }
      </Grid>
    </Grid>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
