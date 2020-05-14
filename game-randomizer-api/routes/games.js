var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/games', function(req, res, next) {
    axios({
        url: 'https://api-v3.igdb.com/games',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'user-key': process.env.IGDB_API_KEY
        },
        data: "fields id, name, platforms.name, rating, age_ratings, genres.name, first_release_date, rating, involved_companies.developer, involved_companies.publisher, summary;"
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.error(err);
        });
});

router.post('/games/query', function (req, res, next) {
    axios({
        url: "https://api-v3.igdb.com/games",
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'user-key': process.env.IGDB_API_KEY
        },
        data: "fields id, name, genres.name, summary; where (platforms = " + req.query.platform + " & genres = (" + req.query.genre + ")); limit 20;"
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(err => {
            console.log(err);
        });
});

module.exports = router;