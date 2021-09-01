const { ObjectID } = require('mongodb');
const mongoCollections = require('./../config/mongoCollections');
const moment = require('moment');
const movies = mongoCollections.movies;
const comments = mongoCollections.comments;


async function getCommentById(id){
    if (!id) throw 'Must provide an id';
    if (typeof id != 'string' || !id.replace(/\s/g,'').length) throw 'Type of ID must be a non-empty string';
    try {
        var objectId = new ObjectID(id);
    } catch (e){
        throw 'Error: Argument ID passed in must be a single String of 12 bytes or a string of 24 hex characters';
    }
    if (!objectId) throw 'Id provided is not a valid Object ID.';
    const commentCollection = await comments();
    const comment = await commentCollection.findOne({ _id: objectId });
    if (!comment) throw 'No comment found for specified id.'
    comment._id = `${comment._id}`;
    return comment;
}
function errorCheckCommenter(name){
    if (!name) throw 'You must provide an commenter name';
    if (typeof name != 'string' || !name.replace(/\s/g,'').length) throw 'Commenter name must be a nonempty string';
}
function errorCheckMovieID(id){
    if (!id) throw 'Must provide an id';
    if (typeof id != 'string' || !id.replace(/\s/g,'').length) throw 'Type of Movie-ID must be a non-empty string';
    try {
        var objectId = new ObjectID(id);
    } catch (e){
        throw 'Error: Argument ID passed in must be a single String of 12 bytes or a string of 24 hex characters';
    }
    if (!objectId) throw 'Id provided is not a valid Object ID.';
}

function errorCheckCommentPost(commentPost){
    if (!commentPost) throw 'You must provide a comment post';
    if (typeof commentPost != 'string' || !commentPost.replace(/\s/g,'').length) throw 'Comment post must be a nonempty string';
}
async function createComment(name, comment, movieID) {
    errorCheckCommenter(name);
    errorCheckCommentPost(comment);
    errorCheckMovieID(movieID);
    let newComment = {
        name: name,
        comment: comment
    }
    const commentCollection = await comments();
    const insertInfo = await commentCollection.insertOne(newComment);
    if (insertInfo.insertedCount === 0) throw 'Could not add Comment';
    const newId = insertInfo.insertedId.toString();
    const commentf = await getCommentById(newId);
    const movieCollection = await movies();
    var objectId = new ObjectID(movieID);
    const movie1 = await movieCollection.findOne({ _id: objectId });
    let updatedMovieData = {};
    let arr = movie1.comments;
    arr.push(newId);
    updatedMovieData.comments = arr;
    const updatedInfo = await movieCollection.updateOne(
        { _id: objectId },
        { $set: updatedMovieData }
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update movie comments successfully';
    }
    return commentf;
}
async function getAllComments(movieM){
    let output = [];
    let allComments = movieM.comments;
    for (r in allComments){
        const rev = await getCommentById(allComments[r]);
        output.push( rev );
    }
    return output;
}
async function removeComment(movieID, commentID){
    var objectId = new ObjectID(commentID);
    var objectId2 = new ObjectID(movieID);
    const movieCollection = await movies();
    const movie1 = await movieCollection.findOne({ _id: objectId2 });
    let updatedMovieData = {};

    let arr = movie1.comments;
    const index = arr.indexOf(commentID);

    if (index > -1) {
        arr.splice(index, 1);
    }
    updatedMovieData.comments = arr;

    const updatedInfo = await movieCollection.updateOne(
        { _id: objectId2 },
        { $set: updatedMovieData }
    );

    if (updatedInfo.modifiedCount === 0) {
        throw 'could not update movie comments successfully';
    }
    const commentCollection = await comments();

    const deletionInfo = await commentCollection.deleteOne({ _id: objectId });
    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete comment with id of ${id}`;
    }
    return {commentId: commentID, deleted: true};
}

module.exports = {
    getAllComments,
    getCommentById,
    removeComment,
    createComment
};

// async function main() {
//     try{
//         const CommentOne = await getAllComments();
//         console.log(CommentOne);
//     } catch (e){
//         console.log(e);
//     }

// };
// main();