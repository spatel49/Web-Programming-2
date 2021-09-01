const movieRoutes = require('./movies');

const constructorMethod = (app) => {
  app.use('/', movieRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;
