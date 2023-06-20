const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')


// put route to allow admin to START and STOP game mode
router.put('/mode/:playlist_id', rejectUnauthenticated, (req, res) => {

    let queryText = ``

    if (req.body.switch === "START") {
        queryText = `UPDATE "masterlist" SET "game_mode"=TRUE WHERE "playlist_id"=$1;`
    } else if (req.body.switch === "STOP") {
        queryText = `UPDATE "masterlist" SET "game_mode"=FALSE WHERE "playlist_id"=$1;`
    }

    pool.query(queryText, [req.params.playlist_id])
    .then(response => res.sendStatus(200))
    .catch(err => {
        console.log("Error on game mode PUT @game.router", err);
        res.sendStatus(500);
    });
});

// put route for players to mark masterlist items as is_played=TRUE
router.put('/play/:masterlist_id', rejectUnauthenticated, (req,res) => {
    const queryText = `UPDATE "masterlist" SET "is_played"=TRUE WHERE "id"=$1;`

    pool.query(queryText, [req.params.masterlist_id])
    .then(response => res.sendStatus(200))
    .catch(err => {
        console.log("Error on masterlist PUT @game.router", err);
        res.sendStatus(500);
    });
});

module.exports = router;