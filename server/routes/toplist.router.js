const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// admin POST route to add new user 
router.post('/:list_id', rejectUnauthenticated, (req, res) => {
    const queryText = `INSERT INTO "toplist"("playlist_id","user_id")
            SELECT "playlist"."id", "user"."id" FROM "user","playlist" WHERE "playlist"."id"=$1 AND "username"=$2;`

    pool.query(queryText, [req.params.list_id, req.body.username])
        .then(response => res.sendStatus(201))
        .catch(err => {
            console.log("Error on user POST in @toplist.router", err);
            res.sendStatus(500);
        });
});

// admin DELETE route to remove user from a panel
router.delete('/:user_id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "toplist" WHERE "user_id"=$1 AND "playlist_id"=$2;`
    pool.query(queryText, [req.params.user_id, req.body.playlist_id])
    .then(response => res.sendStatus(204))
    .catch(err => {
        console.log("Error on user DELETE in @toplist.router", err);
    })
});

// GET req to display upcoming 
router.get('/panels', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "masterlist"."artist", STRING_AGG(DISTINCT "user"."username", ', ') AS "users", "toplist"."playlist_id", "masterlist"."recording_date" 
    FROM "playlist"
    JOIN "toplist" ON "toplist"."playlist_id"="playlist"."id"
    JOIN "masterlist" ON "masterlist"."playlist_id"="playlist"."id"
    JOIN "user" ON "user"."id"="toplist"."user_id"
    GROUP BY "toplist"."playlist_id", "artist", "recording_date"
    HAVING $1 = ANY(ARRAY_AGG("user"."id"));`

    pool.query(queryText, [req.user.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(err => {
        console.log("Error on /panels GET in @toplist.router", err)
    });
});

router.get('/top/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "track","album","artist","toplist"."playlist_id","toplist"."hidden" FROM "masterlist"
    JOIN "playlist" ON "playlist"."id"="masterlist"."playlist_id"
    JOIN "toplist" ON "toplist"."playlist_id"="playlist"."id"
    JOIN "user" ON "user"."id"="toplist"."user_id"
    WHERE "toplist"."playlist_id" = $1
    GROUP BY "track","album","artist","toplist"."playlist_id","toplist"."hidden"
    ORDER BY "album";`
    pool.query(queryText, [req.params.id])
    .then(result => {
        res.send(result.rows);
    }).catch(err => {
        console.log("Error on /top/id GET in @toplist.router", err);
    });
});

module.exports = router;