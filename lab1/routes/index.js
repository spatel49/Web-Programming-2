const movieRoutes = require('./movies');
const commentRoutes = require('./comments');

const constructorMethod = (app) => {
  app.use('/api/movies', movieRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;