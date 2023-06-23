import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function UserPage({currentList, setCurrentList}) {

  // instantiate hooks
  const user = useSelector((store) => store.user);
  const panels = useSelector((store) => store.toplist.panelReducer);
  const toplist = useSelector((store) => store.toplist.toplistReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PANELS' });
  }, []);
  

  const fetchToplist = (playlist_id) => {
    setCurrentList(playlist_id)
    dispatch({type: 'FETCH_TOPLIST', payload: {playlist_id}})
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
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {panels.map(panel => {
            return (
              <tr key={panel.playlist_id} onClick={() => fetchToplist(panel.playlist_id)}>
                <td>{panel.artist}</td>
                <td>{panel.users}</td>
                <td>{moment(panel.recording_date).format('MM/DD/YYYY')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <h4>{toplist.length > 0 && toplist[0].artist}</h4>
      <h4>{toplist.length > 0 && moment(toplist[0].recording_date).format('MM/DD/YYYY')}</h4>
      <table>
        <thead>
          <tr>
            <td>Track</td>
            <td>Album</td>
          </tr>
        </thead>
        <tbody>
          {toplist && 
          toplist.map(track => {
              return (
                <tr key={track.id}>
                  <td>{track.track}</td>
                  <td>{track.album}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
