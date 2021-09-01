const axios = require('axios');

function concatURL(searchTerm) {
    const showURL = "http://api.tvmaze.com/search/shows?q=";
    var final = showURL + searchTerm;
    return final;
}

async function getShows(searchTerm){
    const { data } = await axios.get(concatURL(searchTerm));
    return data;
}

async function getShowByTerm(searchTerm) {
    if (typeof searchTerm != 'string' || !searchTerm.replace(/\s/g,'').length) throw 'Type of search term must be a non-empty string';
    const shows = await getShows(searchTerm);
    if (!shows) throw 'Show not found';
    let arr = [];
    var count = 0;
    for (sh in shows){
        if (count < 20){
            arr.push(shows[sh]);
            count++;
        }
    }
    return arr;
}

// async function main(){
//     try{
//         const output = await getShowByTerm("under");
//         console.log(output);
//     } catch (e){
//         console.log(e);
//     }
// }

// main();
module.exports= {
    getShowByTerm
}