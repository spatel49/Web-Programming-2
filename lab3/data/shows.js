const axios = require('axios');

function concatURL(id) {
    const showURL = "http://api.tvmaze.com/shows/";
    var final = showURL + id;
    return final;
}

async function getShows(id){
    const { data } = await axios.get(concatURL(id));
    return data;
}

async function findAllShows(){
    const { data } = await axios.get("http://api.tvmaze.com/shows");
    return data;
}

async function getAllShows() {
    const shows = await findAllShows();
    return shows;
}

async function getShowById(id) {
    if (id < 1 || id > 51735) throw 'Error: Id must be in bounds';
    if (id == undefined) throw 'Error: id does not exist';
    if (!parseInt(id)) throw 'Error: id must be a number';
    if (id % 1 != 0) throw 'Error: Id must be an integer';
    const shows = await getShows(id);
    if (!shows) throw 'Show not found';
    return shows;
}

module.exports= {
    getAllShows,
    getShowById
}
