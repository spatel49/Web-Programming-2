const searchRoutes = require('./search');
const showRoutes = require('./shows');
const popularRoutes = require('./popularsearches');
const mainRoutes = require('./main');
const express = require('express');
const router = express.Router();

const constructorMethod = (app) => {
  app.use('/search', searchRoutes);
  app.use('/show', showRoutes);
  app.use('/popularsearches', popularRoutes);
  app.use('/', mainRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;