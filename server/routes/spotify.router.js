const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware')

//import dotenv variables
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let accessToken = {}

router.get('/', rejectUnauthenticated, async (req, res) => {
    try {
        //sending a POST request with our Client ID and Client Secret to retreive our access code.
        const response = await axios.post('https://accounts.spotify.com/api/token',
            `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        //assigning new access code
        accessToken = response.data
        console.log("*robot voice* ACCESS. GRANTED.", console.log(req.user));
        res.sendStatus(200);
    } catch (error) {
        console.log("Error retreiving Spotify access token", error)
    }
});

router.post('/', rejectUnauthenticated, async (req, res) => {
    try {
        // sending GET request for playlist data, passing in the Playlist URI
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${req.body.spotify_id}/tracks?fields=items(track(name,album(name),artists(name)))`,
            {
                headers: {
                    // sending access token info for auth
                    'Authorization': `${accessToken.token_type} ${accessToken.access_token}`
                }
            })
        // create new playlist entry, create toplist for admin
        const result = await pool.query(`
            INSERT INTO "playlist" ("spotify_id", "user_id")
            VALUES ($1, $2)
            RETURNING "id";`, [req.body.spotify_id, req.user.id]);
        
        console.log(req.user.id);

        // query text for insert statements in for loop:
        // adds new masterlist row, and then adds toplist row with reference to 
        // newly created masterlist.id

        let queryText = `WITH "inserted_masterlist" AS (
            INSERT INTO "masterlist"("playlist_id","track","album","artist","recording_date")
            VALUES($1,$2,$3,$4,$5)
            RETURNING "id"
            )
            INSERT INTO "toplist"("masterlist_id","user_id")
            SELECT "id", CAST($6 AS INT)
            FROM "inserted_masterlist"
            CROSS JOIN (SELECT CAST($6 AS INT) AS "user_id") AS "user_data";`

        // attach response data to variable to use in for loop
        let playlistArray = response.data.items
        // loop over response data to add individual rows
        for (track of playlistArray) {
            pool.query(queryText,
                [result.rows[0].id, track.track.name, track.track.album.name, track.track.artists[0].name,
                req.body.recording_date, req.user.id])
                .catch(err => console.log("err on playlist track DB insert", err));
        }
        res.sendStatus(201);
    } catch (error) {
        console.log('Error on playlist post', error, req.body)
        res.sendStatus(500);
    }
});

module.exports = router;
