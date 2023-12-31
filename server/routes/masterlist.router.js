const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// put req for admin to update recording_date for masterlists
router.put('/:playlist_id', rejectUnauthenticated, (req, res) => {
  if (req.user.is_admin) {
    const queryText = `UPDATE "masterlist" SET "recording_date"=$1 WHERE "playlist_id"=$2;`

    pool.query(queryText, [req.body.recording_date, req.params.playlist_id])
      .then(response => res.sendStatus(200))
      .catch(err => {
        console.log("Error on recording_date PUT in @masterlist.router", err);
        res.sendStatus(500);
      });
  } else res.sendStatus(403);
});
// retreive masterlist data for admin panel editor and gameplay
router.get('/:playlist_id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "masterlist" 
  WHERE "playlist_id"=$1 
  ORDER BY "is_played" DESC, "id";`

    pool.query(queryText, [req.params.playlist_id])
      .then(result => {
        res.send(result.rows)
      })
      .catch(err => {
        console.log("Error on /:playlist_id GET in @masterlist.router", err);
        res.sendStatus(500);
      });
});

module.exports = router;
