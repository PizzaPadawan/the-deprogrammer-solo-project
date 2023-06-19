const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

router.put('/:playlist_id', rejectUnauthenticated, (req, res) => {

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

module.exports = router;