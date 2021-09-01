const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;

router.get('/:searchTerm', async (req, res) => {
  try {
    const postList = await searchData.getShowByTerm(req.params.searchTerm);
    if (postList.length == 0){
      var keywords = "No Matches";
      res.render('errors/noMatches', { searchTerm: req.params.searchTerm, keywords: keywords});
    } else {
      var keywords = "Shows Found";
      res.render('posts/multipleSearch', { searchTerm: req.params.searchTerm, postList: postList, keywords: keywords});
    }
  } catch (e) {
    var keywords = "Error 400";
    res.status(400).render('errors/multipleShows', {keywords: keywords});
  }
});

router.get('/', async (req, res) => {
  var keywords = "Search";
  res.render('posts/search', {keywords: keywords});
});

router.post('/:searchTerm', async (req, res) => {
  try {
      let bodyData = req.body;
      res.redirect(`/search/${bodyData.searchTerm}`);
      res.status(501).send();
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