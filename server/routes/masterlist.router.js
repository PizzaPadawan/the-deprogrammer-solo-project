const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware')

router.put('/:playlist_id', (req, res) => {
  const queryText = `UPDATE "masterlist" SET "recording_date"=$1 WHERE "playlist_id"=$2;`

  pool.query(queryText, [req.body.recording_date, req.params.playlist_id])
  .then(response => res.sendStatus(200))
  .catch(err => {
    console.log("Error on recording_date PUT @masterlist.router", err);
    res.sendStatus(500);
  })
});

module.exports = router;
