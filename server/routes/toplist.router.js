const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')


// router.get('/', (req, res) => {

// });

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

router.delete('/:user_id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "toplist" WHERE "user_id"=$1 AND "playlist_id"=$2;`
    pool.query(queryText, [req.params.user_id, req.body.playlist_id])
    .then(response => res.sendStatus(204))
    .catch(err => {
        console.log("Error on user DELETE in @toplist.router", err);
    })
})

module.exports = router;