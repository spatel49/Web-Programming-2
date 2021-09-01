const express = require('express');
const router = express();
const data = require('../data');
const movieData = data.movies;
const commentData = data.comments;
router.use(express.json());

router.get('/:id', async (req, res) => {
  try {
    const movie = await movieData.getMovieById(req.params.id);
    res.json(movie);
  } catch (e) {
    res.status(404).json({ error: 'Movie not found' });
  }
});

router.get('/', async (req, res) => {
  const movieList = await movieData.getAllMovies();
  let arr = movieList;
  try {
    if (req.query.skip){
      if (req.query.skip < 0) throw 'Skip cannot be less than 0';
      arr = movieList.slice(req.query.skip, movieList.length);
      if (arr.length > 100){
        arr = arr.slice(0, 100);
      }
    }
    if(req.query.take){
      if (req.query.take < 0) throw 'Take cannot be less than 0'
      if (req.query.take <= arr.length && req.query.take <= 100){
        arr = arr.slice(0, req.query.take);
      } else if (arr.length >= 100 && req.query.take >= 100){
        arr = arr.slice(0, 100);
      } else {
        arr = arr.slice(0, arr.length);
      }
    } else {
      arr = arr.slice(0, 20);
    }
    res.json(arr);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.post('/', async (req, res) => {
  const movieDataPost = req.body;
  if (!movieDataPost.title) {
    res.status(400).json({ error: 'You must provide movie title' });
    return;
  }
  if (!movieDataPost.cast) {
    res.status(400).json({ error: 'You must provide movie cast' });
    return;
  }
  if (!movieDataPost.info) {
    res.status(400).json({ error: 'You must provide movie info: director and yearReleased' });
    return;
  }
  if (!movieDataPost.plot) {
    res.status(400).json({ error: 'You must provide movie plot' });
    return;
  }
  if (!movieDataPost.rating) {
    res.status(400).json({ error: 'You must provide movie rating' });
    return;
  }
  try {
    const { title, cast, info, plot, rating } = movieDataPost;
    const newMovie = await movieData.createMovie(title, cast, info, plot, rating);
    res.json(newMovie);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.put('/:id', async (req, res) => {
  const updatedData = req.body;
  if (!updatedData.title || !updatedData.cast || !updatedData.info || !updatedData.plot || !updatedData.rating) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }
  try {
    await movieData.getMovieById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }
  try {
    const updatedMovie = await movieData.updateMovie(req.params.id, updatedData);
    res.json(updatedMovie);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.patch('/:id', async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};
  try {
    const oldMovie = await movieData.getMovieById(req.params.id);
    if (requestBody.title && requestBody.title !== oldMovie.title)
      updatedObject.title = requestBody.title;
    if (requestBody.cast && requestBody.cast !== oldMovie.cast){
      let arr = requestBody.cast;
      let arr2 = oldMovie.cast;
      let check = true;
      for (gen in arr){
        for (gen2 in arr2){
          check = check & (arr[gen] != arr2[gen2]);
        }
        if (check){
          arr2.push(arr[gen]);
        } else {
          check = true;
        }
      }
      updatedObject.cast = arr2;
    }
    if (requestBody.info && requestBody.info !== oldMovie.info)
      updatedObject.info = requestBody.info;
    if (requestBody.plot && requestBody.plot !== oldMovie.plot)
      updatedObject.plot = requestBody.plot;
    if (requestBody.rating && requestBody.rating !== oldMovie.rating)
      updatedObject.rating = requestBody.rating;
  } catch (e) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }
  if (Object.keys(updatedObject).length !== 0) {
    try {
      const updatedMovie = await movieData.updateMovie(
        req.params.id,
        updatedObject
      );
      res.json(updatedMovie);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  } else {
    res
      .status(400)
      .json({
        error:
          'No fields have been changed from their inital values, so no update has occurred'
      });
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must supply an ID to delete' });
    return;
  }
  try {
    await movieData.getMovieById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Movie not found' });
    return;
  }
  try {
    const output = await movieData.removeMovie(req.params.id);
    res.json(output);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.post('/:id/comments', async (req, res) => {
  const commentDataPost = req.body;
  if (!commentDataPost.name) {
    res.status(400).json({ error: 'You must provide commenter name' });
    return;
  }
  if (!commentDataPost.comment) {
    res.status(400).json({ error: 'You must provide comment content' });
    return;
  }
  try {
    const findMovie = await movieData.getMovieById(req.params.id);
    if (!findMovie) throw 'Not a valid ID';
    const { name, comment } = commentDataPost;

    const newComment = await commentData.createComment(name, comment, req.params.id);
    res.json(newComment);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.delete('/:id1/:id2', async (req, res) => {
  if (!req.params.id1) {
      res.status(400).json({ error: 'You must supply a Movie ID' });
      return;
    }
  if (!req.params.id2) {
      res.status(400).json({ error: 'You must supply a comment ID to delete' });
      return;
  }
  try {
      await movieData.getMovieById(req.params.id1);
      await commentData.getCommentById(req.params.id2);
  } catch (e) {
      res.status(404).json({ error: 'Comment not found' });
      return;
  }
  try {
      const output = await commentData.removeComment(req.params.id1, req.params.id2);
      res.json(output);
  } catch (e) {
      res.status(400).json({ error: e });
  }
});

module.exports = router;