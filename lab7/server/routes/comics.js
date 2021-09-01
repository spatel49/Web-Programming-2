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

const md5 = require('blueimp-md5');
const publickey = '45408955448ee04cf6fac893ed3d69e3';
const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&offset=";
const searchurl = baseUrl + '?titleStartsWith=';
const url2 = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&id=";

router.get('/:id', async (req, res) => {
  try {
    let cachedForSingleComic = await client.getAsync('singleComic/' + req.params.id);
    if (cachedForSingleComic) {
      res.send(cachedForSingleComic);
    } else {
      const { data } = await axios.get(url2 + req.params.id);
      res.json(data);
      let cachedForSingleComic = await client.setAsync(
        'singleComic/' + req.params.id,
        JSON.stringify(data)
      );
    }
  } catch (e) {
    res.status(404).json({ error: '404: Comic not found' });
  }
});

router.get('/page/:page', async (req, res) => {
  try {
    let cachedForComics = await client.getAsync('Comics/' + req.params.page);
    if (cachedForComics) {
      res.send(cachedForComics);
    } else {
      const { data } = await axios.get(url + req.params.page);
      res.json(data);
      let cachedForComics = await client.setAsync(
        'Comics/' + req.params.page,
        JSON.stringify(data)
      );
     }
  } catch (e) {
    res.status(404).json({ error: '404: Page not found' });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    let cachedForComicstitle = await client.getAsync('comics/title/' + req.params.title);
    if (cachedForComicstitle) {
      res.send(cachedForComicstitle);
    } else {
      const { data } = await axios.get(searchurl + req.params.title + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
      res.json(data);
      let cachedForComicstitle = await client.setAsync(
        'comics/title/' + req.params.title,
        JSON.stringify(data)
      );
   }
  } catch (e) {
    res.status(404).json({ error: '404: Page not found' });
  }
});


module.exports = router;