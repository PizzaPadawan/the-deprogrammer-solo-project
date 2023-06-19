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
            console.log("Error on user DB select", err);
            res.sendStatus(500);
        });
});

module.exports = router;