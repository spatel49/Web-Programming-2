const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;

router.get('/', async (req, res) => {
  var keywords = "Popular Searches";
  var topten = [];
  res.render('posts/search', {keywords: keywords, topten: topten});
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