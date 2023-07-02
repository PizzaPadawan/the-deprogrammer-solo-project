const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')


// put route to allow admin to START and STOP game mode
router.put('/mode/:playlist_id', rejectUnauthenticated, (req, res) => {
    if (req.user.is_admin) {
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
    } else res.sendStatus(403);
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

// GET route to display current tallies for gameplay
router.get('/tallies/:playlist_id', rejectUnauthenticated, (req, res) => {
    const playlistId = req.params.playlist_id;

    const queryText = `
    SELECT
        "track",
        "album",
        jsonb_object_agg(
        "username",
        "individual_tally"
        ) || jsonb_build_object('Total', SUM("individual_tally")) AS "result"
    FROM (
    SELECT
        "track",
        "album",
        "username",
        COUNT(DISTINCT CASE WHEN "toplist"."hidden" = FALSE THEN "user"."username" END) AS "individual_tally"
    FROM
      "toplist"
    JOIN
        "masterlist" ON "toplist"."masterlist_id" = "masterlist"."id"
    JOIN
        "user" ON "toplist"."user_id" = "user"."id"
    WHERE
        "masterlist"."playlist_id" = $1
        AND "masterlist"."is_played" = TRUE
    GROUP BY
        "track",
        "album",
        "username"
    ) AS subquery
    GROUP BY
        "track",
        "album";
    `;

    pool.query(queryText, [playlistId])
        .then(result => {
            const tallies = result.rows;
            res.send(tallies);
        })
        .catch(error => {
            console.error('Error on /tallies/playlist_id in game.router', error);
            res.sendStatus(500);
        });
});

module.exports = router;