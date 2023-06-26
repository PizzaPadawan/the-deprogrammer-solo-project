import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

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

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <br />
      <h3>Upcoming Panels:</h3>
      <table>
        <thead>
          <tr>
            <td>Artist</td>
            <td>Panel</td>
            <td>Recording Date</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {/* mapping over our panels store to show upcoming panels the user is a part of */}
          {panels.map(panel => {
            return (
              // conditional rendering to only return panels with recording_date greater than or equal to today's date
              moment(panel.recording_date).format('MM/DD/YYYY') > moment().subtract(1,'days').format('MM/DD/YYYY') &&
              <tr key={panel.playlist_id}>
                <td>{panel.artist}</td>
                <td>{panel.users}</td>
                <td>{moment(panel.recording_date).format('MM/DD/YYYY')}</td>
                <td><button onClick={() => fetchToplist(panel.playlist_id)}>Show</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      {/* if toplist store is populated, display the Artist and Recording Date of selected panel */}
      <h4>{toplist.length > 0 && toplist[0].artist}</h4>
      <h4>{toplist.length > 0 && moment(toplist[0].recording_date).format('MM/DD/YYYY')}</h4>
      {toplist.length > 0 &&
        <table>
          <thead>
            <tr>
              <td>Track</td>
              <td>Album</td>
            </tr>
          </thead>
          <tbody>
            {toplist.map(track => {
              return (
                !track.hidden &&
                <tr key={track.id}>
                  <td>{track.track}</td>
                  <td>{track.album}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
