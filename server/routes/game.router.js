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
router.put('/play/:masterlist_id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "masterlist" SET "is_played"=TRUE WHERE "id"=$1;`

    pool.query(queryText, [req.params.masterlist_id])
        .then(response => res.sendStatus(200))
        .catch(err => {
            console.log("Error on masterlist PUT @game.router", err);
            res.sendStatus(500);
        });
});

// delete route to enter "Discussion" mode. Deletes all unplayed songs in masterlist.
router.delete('/discussion/:playlist_id', rejectUnauthenticated, async (req, res) => {
    try {
        // first, delete all applicable toplist entries
        await pool.query(`
            DELETE FROM "toplist"
            WHERE "masterlist_id" IN (
                SELECT "id"
                FROM "masterlist"
                WHERE "playlist_id" = $1 AND "is_played" = FALSE
            );
            `, [req.params.playlist_id])
        // then delete masterlist entries
        const queryText = `DELETE FROM "masterlist"
        WHERE "playlist_id" = $1 AND "is_played" = FALSE;`
        await pool.query(queryText, [req.params.playlist_id])
            .then(response => res.sendStatus(204))
            .catch(err => {
                console.log("Error on /discussion masterlist DELETE in @game.router", err);
            });
    } catch (error) {
        console.log("Error on /discussion toplist DELETE in @game.router", err);
    }

});

module.exports = router;