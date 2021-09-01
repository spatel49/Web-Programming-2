const express = require('express');
const router = express();
const data = require('../data');
const { getMovieById } = require('../data/movies');
const commentData = data.comments;
const movieData = data.movies;
router.use(express.json());

router.get('/:id1/:id2', async (req, res) => {
  try {
    const checkMovie = await movieData.getMovieById(req.params.id1);
    if (!checkMovie) throw 'Movie id does not exist';
    const comment = await commentData.getCommentById(req.params.id2);
    if (!checkMovie) throw 'Comment id does not exist';
    res.json(comment);
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movieExists = await movieData.getMovieById(req.params.id);
    if (!movieExists) throw 'Movie ID does not exist';
    const commentList = await commentData.getAllComments(movieExists);
    res.json(commentList);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.post('/:id', async (req, res) => {
  console.log("hello");
  const commentDataPost = req.body;
  if (!commentDataPost.name) {
    res.status(400).json({ error: 'You must provide commenter name' });
    return;
  }
  console.log("hello");
  if (!commentDataPost.comment) {
    res.status(400).json({ error: 'You must provide comment content' });
    return;
  }
  console.log("hello");
  try {
    const findMovie = await getMovieById(req.params.id);
    console.log("hello");
    if (!findMovie) throw 'Not a valid ID';
    const { name, comment } = commentDataPost;
    console.log("hello");
    const newComment = await commentData.createComment(name, comment, req.params.id);
    console.log("hello");
    res.json(newComment);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.put('/:id', async (req, res) => {
  const updatedData = req.body;
  if (!updatedData.title || !updatedData.cast || !updatedData.info || !updatedData.plot || !updatedData.rating) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }
  try {
    await commentData.getCommentById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
    return;
  }
  try {
    const updatedComment = await commentData.updateComment(req.params.id, updatedData);
    res.json(updatedComment);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.patch('/:id', async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};
  try {
    const oldComment = await commentData.getCommentById(req.params.id);
    if (requestBody.title && requestBody.title !== oldComment.title)
      updatedObject.title = requestBody.title;
    if (requestBody.cast && requestBody.cast !== oldComment.cast)
      updatedObject.cast = requestBody.cast;
    if (requestBody.info && requestBody.info !== oldComment.info)
      updatedObject.info = requestBody.info;
    if (requestBody.plot && requestBody.plot !== oldComment.plot)
      updatedObject.plot = requestBody.plot;
    if (requestBody.rating && requestBody.rating !== oldComment.rating)
      updatedObject.rating = requestBody.rating;
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
    return;
  }
  if (Object.keys(updatedObject).length !== 0) {
    try {
      const updatedComment = await commentData.updateComment(
        req.params.id,
        updatedObject
      );
      res.json(updatedComment);
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