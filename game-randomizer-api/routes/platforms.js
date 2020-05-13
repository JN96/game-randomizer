var express = require('express');
var axios = require('axios');
var router = express.Router();

router.get('/platforms', function(req, res, next) {
    axios({
        url: 'https://api-v3.igdb.com/platforms',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'user-key': process.env.IGDB_API_KEY
        },
        data: "fields id, name; where (id = (48, 49, 6));"
    })
        .then(response => {
            console.log(response.data);
            console.log(response.data.length);
            res.send(response.data);
        })
        .catch(err => {
            console.error(err);
        });
});

module.exports = router;