const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
const path = require('path');
const data = require('./data');
const showData = data.shows;
const searchData = data.search;


const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const { getAllShows } = require('./data/shows');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', async (req, res, next) => {
  let cacheForHomePageExists = await client.getAsync('homePage');
  if (cacheForHomePageExists) {
    res.send(cacheForHomePageExists);
  } else {
    next();
  }
});


app.get('/', async (req, res) => {
  let shows = await showData.getAllShows();
  let datahtml = "";
  res.render("../views/posts/multiple", {postList: shows, keywords: "Shows Found"}, async function (err, html) {
    if (!err){
      datahtml = html;
      let cachedForHomePage = await client.setAsync('homePage',datahtml);
      res.send(datahtml);
    } else {
      console.log("error");
    }
  });
});

app.get('/show/:id', async (req, res, next) => {
  let cacheForShowIdExists = await client.getAsync(req.params.id);
  if (cacheForShowIdExists) {
    res.send(cacheForShowIdExists);
  } else {
    next();
  }
});


app.get('/show/:id', async (req, res) => {
  try {
    const post = await showData.getShowById(req.params.id);
    var regex = /(<([^>]+)>)/ig;
    post.summary = (post.summary).replace(regex, "");
    var keywords = post.name;
    let datahtml = "";
    res.render("../views/posts/single", {post: post, keywords: keywords}, async function (err, html) {
      if (!err){
        datahtml = html;
        let cachedForShowId = await client.setAsync(req.params.id,datahtml);
        res.send(datahtml);
      } else {
        console.log("error");
      }
    });
  } catch (e) {
    var keywords = "Error 404";
    res.status(404).render('errors/singleShow', { id: req.params.id , error: e, keywords: keywords});
  }
});

let sortedSet = "";
app.post('/search', async (req, res, next) => {
  let bodyData = req.body;
    try {
      const postList = await searchData.getShowByTerm(bodyData.searchTerm);
      if (postList.length == 0){
        var keywords = "No Matches";
        res.render('errors/noMatches', { searchTerm: bodyData.searchTerm, keywords: keywords});
      } else {
        var keywords = "Shows Found";
        res.render("../views/posts/multipleSearch", {searchTerm: bodyData.searchTerm, postList: postList, keywords: keywords}, async function (err, html) {
          if (!err){
            client.exists(sortedSet, async function (err,reply){
              if (!err){
                if(reply == 1){
                  datahtml = html;
                  let incrSet = await client.zincrby(sortedSet,1,bodyData.searchTerm);
                  res.send(datahtml);
                } else {
                  datahtml = html;
                  let cachedForSearch = await client.zadd(sortedSet, 1, bodyData.searchTerm);
                  res.send(datahtml);
                }
              } else {
                datahtml = html;
                let cachedForSearch = await client.zadd(sortedSet, 1, bodyData.searchTerm);
                res.send(datahtml);
              }
            });
          } else {
            console.log("error");
          }
        });
      }
    } catch (e) {
      var keywords = "Error 400";
      res.status(400).render('errors/multipleShows', {keywords: keywords});
    }
});

app.get('/popularsearches', async (req, res, next) => {
  var keywords = "Popular Searches";
  client.exists(sortedSet, async function (err,reply){
    if (!err){
      if(reply == 1){
        let arrTop = await client.zrangebyscoreAsync(sortedSet, 0, 100);
        arrTop.reverse();
        console.log(arrTop);
        arrTop.slice(0, 10);
        res.render('posts/popular', {keywords: keywords, topten: arrTop}, async function (err, html) {
          if (!err){
            res.send(html);
          }
        });
      } else {
        res.render('posts/popular', {keywords: keywords, topten: []}, async function (err, html) {
          if (!err){
            res.send(html);
          }
        });
      }
    } else {
      res.render('posts/popular', {keywords: keywords, topten: []}, async function (err, html) {
        if (!err){
          res.send(html);
        }
      });
    }
  });
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});