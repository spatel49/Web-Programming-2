const express = require('express');
const router = express();
router.use(express.json());
const path = require('path');


router.get('/', async (req, res) => {
  try {
    res.sendFile(path.resolve('static/movies.html'));
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;