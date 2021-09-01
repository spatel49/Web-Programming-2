const { ObjectID } = require('mongodb');
const mongoCollections = require('./../config/mongoCollections');
const moment = require('moment');
const { getCommentById, removeComment } = require('./comments');
const movies = mongoCollections.movies;
const comments = mongoCollections.comments;
const commentData = require('./../data/comments');


async function getMovieById(id){
    if (!id) throw 'Must provide an id';
    if (typeof id != 'string' || !id.replace(/\s/g,'').length) throw 'Type of ID must be a non-empty string';
    try {
    var objectId = new ObjectID(id);
    } catch (e){
    throw 'Error: Argument Id passed in must be a single String of 12 bytes or a string of 24 hex characters';
    }
    if (!objectId) throw 'Id provided is not a valid Object ID.';
    const movieCollection = await movies();
    const movie = await movieCollection.findOne({ _id: objectId });
    if (!movie) throw 'No Movie found for specified id.'
    movie._id = `${movie._id}`;
    const allComments = await commentData.getAllComments(movie);
    movie.comments = allComments;
    return movie;
}

function errorCheckCast(cast){
    if (!cast) throw 'You must provide a cast';
    if (!Array.isArray(cast) || cast.length < 1 ) throw 'Cast must be an array of objects with atleast 1 cast';
    for (obj in cast){
        if (typeof cast[obj] != 'object' || !cast[obj].firstName.replace(/\s/g,'').length || !cast[obj].lastName.replace(/\s/g,'').length) throw 'Cast must be an array of objects of strings with atleast 1 cast';
    }
}

function errorCheckInfo(info){
    if (!info) throw 'You must provide an info';
    if (typeof info != 'object' || !info.director || !info.yearReleased || typeof info.director != 'string' || typeof info.yearReleased != 'number' || !info.director.replace(/\s/g,'').length || info.yearReleased < 1000 || info.yearReleased > 2021 || Object.keys(info).length != 2) throw 'Info must be an object with director as nonempty string and yearReleased as number between 1000-2021';
}

function errorCheckTitle(title){
    if (!title) throw 'You must provide a title';
    if (typeof title != 'string' || !title.replace(/\s/g,'').length) throw 'Title must be a nonempty string';
}
function errorCheckPlot(plot){
    if (!plot) throw 'You must provide a plot';
    if (typeof plot != 'string' || !plot.replace(/\s/g,'').length) throw 'Plot must be a nonempty string';
}
function errorCheckRating(rating){
    if (!rating) throw 'You must provide a rating';
    if (typeof rating != 'number' || rating >5 || rating < 0) throw 'Rating must be a number between 0-5';
}
async function createMovie(title, cast, info, plot, rating) {
    errorCheckTitle(title);
    errorCheckCast(cast);
    errorCheckInfo(info);
    errorCheckPlot(plot);
    errorCheckRating(rating);
    let newMovie = {
        title: title,
        cast: cast,
        info: info,
        plot: plot,
        rating: rating,
        comments: []
    }
    const movieCollection = await movies();
    const insertInfo = await movieCollection.insertOne(newMovie);
    if (insertInfo.insertedCount === 0) throw 'Could not add Movie';
    const newId = insertInfo.insertedId.toString();
    const movie = await getMovieById(newId);
    return movie;
}
async function getAllMovies(){
    const movieCollection = await movies();
    const movieList = await movieCollection.find({}).toArray();
    for (movie in movieList){
        movieList[movie]._id = `${movieList[movie]._id}`;
        try {
            const allComments = await commentData.getAllComments(movieList[movie]);
            movieList[movie].comments = allComments;
        } catch (e){
            console.log(e);
        }
    }
    return movieList;
}
async function removeMovie(id){
    const getMovie = await getMovieById(id);
    let arr = getMovie.comments;
    if (arr.length != 0){
       for (rev in arr){
        try {
            const getComment = await removeComment(arr[rev]);
        } catch (e){
            console.log(e);
        }
        } 
    }
    
    var objectId = new ObjectID(id);
    const movieCollection = await movies();
    const deletionInfo = await movieCollection.deleteOne({ _id: objectId });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete movie with id of ${id}`;
    }
    let output = {};
    output.movieId = id;
    output.deleted = true;
    return output;
}
async function updateMovie(id, updatedMovie){
    const getMovie = await getMovieById(id);
    if (!getMovie) throw 'Movie does not exist for the id provided.';
    
    var objectId = new ObjectID(id);
    const movieCollection = await movies();
    const updatedMovieData = {};
    if (updatedMovie.title) {
        errorCheckTitle(updatedMovie.title);
        updatedMovieData.title = updatedMovie.title;
    }
    if (updatedMovie.cast) {
        errorCheckCast(updatedMovie.cast);
        updatedMovieData.cast = updatedMovie.cast;
    }
    if (updatedMovie.info) {
        errorCheckInfo(updatedMovie.info);
        updatedMovieData.info = updatedMovie.info;
    }
    
    if (updatedMovie.plot) {
        errorCheckPlot(updatedMovie.plot);
        updatedMovieData.plot = updatedMovie.plot;
    }
    if (updatedMovie.rating) {
        errorCheckRating(updatedMovie.rating);
        updatedMovieData.rating = updatedMovie.rating;
    }

    const tempMovie = await getMovieById(id);
    updatedMovieData.comments = tempMovie.comments;
    
    const updatedInfo = await movieCollection.updateOne(
        { _id: objectId },
        { $set: updatedMovieData }
    );
    
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update movie title successfully';
    }
    return await getMovieById(id);
}
module.exports = {
    getAllMovies,
    getMovieById,
    removeMovie,
    updateMovie,
    createMovie
};

// async function main() {
//     try{
//         const MovieOne = await getAllMovies();
//         console.log(MovieOne);
//     } catch (e){
//         console.log(e);
//     }

// };
// main();