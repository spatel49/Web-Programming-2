const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require('path');
const showData = data.shows;

router.get('/:id', async (req, res) => {
  try {
    const post = await showData.getShowById(req.params.id);
    var regex = /(<([^>]+)>)/ig;
    post.summary = (post.summary).replace(regex, "");
    var keywords = post.name;
    res.render('posts/single', { post: post, keywords: keywords});
  } catch (e) {
    var keywords = "Error 404";
    res.status(404).render('errors/singleShow', { id: req.params.id , error: e, keywords: keywords});
  }
});

router.get('/', async (req, res) => {
  try {
    const postList = await showData.getAllShows();
    var keywords = "Shows Found";
    res.render('posts/multiple', { postList: postList, keywords: keywords});
  } catch (e) {
    var keywords = "Error 400";
    res.status(400).render('errors/multipleShows', {error: e, keywords: keywords});
  }
});

router.post('/:id', async (req, res) => {
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