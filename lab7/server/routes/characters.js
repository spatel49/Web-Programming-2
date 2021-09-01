const axios = require('axios');
const express = require('express');
const router = express();
router.use(express.json());

// Redis 
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//API
const md5 = require('blueimp-md5');
const publickey = '45408955448ee04cf6fac893ed3d69e3';
const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&offset=";
const searchurl = baseUrl + '?nameStartsWith=';
const url2 = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&id=";

router.get('/:id', async (req, res) => {
  try {
    let cachedForSingleCharacter = await client.getAsync('singleCharacter/' + req.params.id);
      if (cachedForSingleCharacter) {
        res.send(cachedForSingleCharacter);
      } else {
        const { data } = await axios.get(url2 + req.params.id);
        res.json(data);
        let cachedForSingleCharacter = await client.setAsync(
          'singleCharacter/' + req.params.id,
          JSON.stringify(data)
        );
    }
  } catch (e) {
    res.status(404).json({ error: '404: Character not found' });
  }
});

router.get('/page/:page', async (req, res) => {
  try {
    let cachedForCharacters = await client.getAsync('characters/' + req.params.page);
    if (cachedForCharacters) {
      res.send(cachedForCharacters);
    } else {
      const { data } = await axios.get(url + req.params.page);
      res.json(data);
      let cachedForCharacters = await client.setAsync(
        'characters/' + req.params.page,
        JSON.stringify(data)
      );
   }
  } catch (e) {
    res.status(404).json({ error: '404: Page not found' });
  }
});

router.get('/name/:name', async (req, res) => {
  try {
    let cachedForCharactersName = await client.getAsync('characters/name/' + req.params.name);
    if (cachedForCharactersName) {
      res.send(cachedForCharactersName);
    } else {
      const { data } = await axios.get(searchurl + req.params.name + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
      res.json(data);
      let cachedForCharactersName = await client.setAsync(
        'characters/name/' + req.params.name,
        JSON.stringify(data)
      );
   }
  } catch (e) {
    res.status(404).json({ error: '404: Page not found' });
  }
});

module.exports = router;