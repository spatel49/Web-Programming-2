const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;
const path = require('path');

const bluebird = require('bluebird');
const flat = require('flat');
const unflatten = flat.unflatten;
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

router.get('/', async (req, res) => {
  try {
    res.sendFile(path.resolve('static/search.html'));
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.post('/', async (req, res) => {
    try {
        let bodyData = req.body;
        res.redirect(`/search/${bodyData.searchTerm}`);
        res.status(501).send();
    } catch (e) {
        res.status(404).json({ message: e });
    }
});

router.delete('/', async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;