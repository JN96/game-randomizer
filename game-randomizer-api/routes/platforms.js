var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/platforms', function(req, res, next) {
    axios({
        url: "https://api-v3.igdb.com/platforms",
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'user-key': process.env.IGDB_API_KEY
        },
        data: "fields name;"
    })
        .then(response => {
            console.log(response.data);
            res.send(response.data);
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;