const express = require('express');
const router = express.Router();
const root = process.cwd()
const path = root + '/views/';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path + 'index.html');
});

module.exports = router;
