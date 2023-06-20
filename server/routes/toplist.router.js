const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// admin POST route to add new user 
router.post('/:list_id', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "toplist" ("masterlist_id", "user_id")
    SELECT "masterlist"."id", "user"."id"
    FROM "masterlist"
    JOIN "playlist" ON "masterlist"."playlist_id" = "playlist"."id"
    JOIN "user" ON "user"."username" = $1
    WHERE "playlist"."id" = $2;`

    pool.query(queryText, [req.body.username, req.params.list_id])
        .then(response => res.sendStatus(201))
        .catch(err => {
            console.log("Error on user POST in @toplist.router", err);
            res.sendStatus(500);
        });
});

// admin DELETE route to remove user from a panel
router.delete('/:user_id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "toplist"
    USING "masterlist"
    JOIN "playlist" ON "playlist"."id"="masterlist"."playlist_id"
    WHERE "toplist"."masterlist_id"="masterlist"."id"
    AND "playlist"."id"=$1
    AND "toplist"."user_id"=$2;`
    pool.query(queryText, [req.body.playlist_id, req.params.user_id])
    .then(response => res.sendStatus(204))
    .catch(err => {
        console.log("Error on user DELETE in @toplist.router", err);
    })
});

// GET req to display upcoming 
router.get('/panels', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "playlist_id", "artist", STRING_AGG(DISTINCT "user"."username", ', ') AS "users", "masterlist"."recording_date" 
    FROM "masterlist"
    JOIN "toplist" ON "toplist"."masterlist_id"="masterlist"."id"
    JOIN "playlist" ON "masterlist"."playlist_id"="playlist"."id"
    JOIN "user" ON "user"."id"="toplist"."user_id"
    GROUP BY "masterlist"."playlist_id", "artist", "recording_date"
    HAVING $1 = ANY(ARRAY_AGG("user"."id"));`

    pool.query(queryText, [req.user.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log("Error on /panels GET in @toplist.router", err);
        res.sendStatus(500);
    });
});

// get request to retreive toplist to be edited by user and used in gameplay
router.get('/top/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "toplist"."id","track","album","artist","toplist"."masterlist_id","toplist"."hidden","recording_date","is_played" FROM "masterlist"
    JOIN "playlist" ON "playlist"."id"="masterlist"."playlist_id"
    JOIN "toplist" ON "toplist"."masterlist_id"="masterlist"."id"
    JOIN "user" ON "user"."id"="toplist"."user_id"
    WHERE "masterlist"."playlist_id"=$1 AND "toplist"."user_id"=$2
    GROUP BY "toplist"."id","track","album","artist","toplist"."masterlist_id","toplist"."hidden","recording_date","is_played"
    ORDER BY "album";`
    pool.query(queryText, [req.params.id, req.user.id])
    .then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log("Error on /top/id GET in @toplist.router", err);
    });
});

router.put('/top/:id', rejectUnauthenticated, (req, res) => {
    const queryText = ``
})

module.exports = router;