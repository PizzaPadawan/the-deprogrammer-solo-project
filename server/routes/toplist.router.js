const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

// admin POST route to add new user 
router.post('/:playlist_id', rejectUnauthenticated, (req, res) => {
    if(req.user.is_admin){
    const queryText = `INSERT INTO "toplist" ("masterlist_id", "user_id")
    SELECT "masterlist"."id", "user"."id"
    FROM "masterlist"
    JOIN "playlist" ON "masterlist"."playlist_id" = "playlist"."id"
    JOIN "user" ON "user"."username" = $1
    WHERE "playlist"."id" = $2
    RETURNING *;`

    pool.query(queryText, [req.body.username, req.params.playlist_id])
        .then(result => {
            if (result.rows.length > 1){
             res.sendStatus(201)
            } else res.send("Invalid username")})
        .catch(err => {
            console.log("Error on user POST in @toplist.router", err);
            res.sendStatus(500);
        });
    } else res.sendStatus(403);
});

// admin DELETE route to remove user from a panel
router.delete('/:user_id', rejectUnauthenticated, (req, res) => {
    if(req.user.is_admin){
    const queryText = `DELETE FROM "toplist"
    USING "masterlist"
    JOIN "playlist" ON "playlist"."id"="masterlist"."playlist_id"
    WHERE "toplist"."masterlist_id"="masterlist"."id"
    AND "playlist"."id"=$1
    AND "toplist"."user_id"=$2;`

    console.log(req.body.playlist_id, req.params)
    pool.query(queryText, [req.body.playlist_id, req.params.user_id])
        .then(response => res.sendStatus(204))
        .catch(err => {
            console.log("Error on user DELETE in @toplist.router", err);
        })
    } else res.sendStatus(403);
});

// GET req to display users on selected panel for admin panel editor
router.get('/panels/:playlist_id', rejectUnauthenticated, (req,res) => {
    const queryText = `SELECT "playlist_id", "user"."id", "user"."username", "user"."is_admin"
    FROM "masterlist"
    JOIN "toplist" ON "toplist"."masterlist_id"="masterlist"."id"
    JOIN "playlist" ON "masterlist"."playlist_id"="playlist"."id"
    JOIN "user" ON "user"."id"="toplist"."user_id"
    WHERE "playlist_id"=$1
    GROUP BY "masterlist"."playlist_id", "user"."id", "user"."username", "user"."is_admin";`

    pool.query(queryText, [req.params.playlist_id])
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log("Error on /panels/:playlist_id GET in @toplist.router", err);
            res.sendStatus(500);
        });
})

// GET req to display upcoming panels for logged in user
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

// get request to retreive toplist to be viewed / edited by user and used in gameplay
router.get('/top/:playlist_id', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT "toplist"."id","track","album","artist","toplist"."masterlist_id","toplist"."hidden","notes","recording_date","is_played","playlist_id" 
    FROM "masterlist"
    JOIN "playlist" ON "playlist"."id"="masterlist"."playlist_id"
    JOIN "toplist" ON "toplist"."masterlist_id"="masterlist"."id"
    JOIN "user" ON "user"."id"="toplist"."user_id"
    WHERE "masterlist"."playlist_id"=$1 AND "toplist"."user_id"=$2
    GROUP BY "toplist"."id","track","album","artist","toplist"."masterlist_id","toplist"."hidden","notes","recording_date","is_played","playlist_id"
    ORDER BY "hidden" ASC, "is_played" ASC, "masterlist_id"`
    pool.query(queryText, [req.params.playlist_id, req.user.id])
        .then(result => {
            res.send(result.rows);
        }).catch(err => {
            console.log("Error on /top/id GET in @toplist.router", err);
        });
});

// user function to mark toplist.hidden=TRUE for a given item, removing it from their toplist
// or switch it back to FALSE if the user would like to bring it back into their toplist
router.put('/hidden/:toplist_id', rejectUnauthenticated, (req, res) => {

    let queryText = ``

    if (req.body.switch === "HIDE") {
        queryText = `UPDATE "toplist" SET "hidden"=TRUE WHERE "id"=$1;`
    } else if (req.body.switch === "SHOW") {
        queryText = `UPDATE "toplist" SET "hidden"=FALSE WHERE "id"=$1;`
    }

    pool.query(queryText, [req.params.toplist_id])
        .then(result => res.sendStatus(200))
        .catch(err => {
            console.log("Error on /top/:id PUT in @toplist.router", err);
            res.sendStatus(500);
        });
});

// put route to allow users to add notes to toplist items
router.put('/notes/:toplist_id', rejectUnauthenticated, (req, res) => {
    const queryText = `UPDATE "toplist" SET "notes"=$1 WHERE "id"=$2;`

    pool.query(queryText, [req.body.notes, req.params.toplist_id])
    .then(result => res.sendStatus(201))
    .catch(err => {
        console.log("Error on /top/:id PUT in @toplist.router", err);
        res.sendStatus(500);
    });
});


module.exports = router;