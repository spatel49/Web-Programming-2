const charactersRoutes = require('./characters');
const comicsRoutes = require('./comics');
const seriesRoutes = require('./series');

const constructorMethod = (app) => {
  app.use('/characters', charactersRoutes);
  app.use('/comics', comicsRoutes);
  app.use('/series', seriesRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;