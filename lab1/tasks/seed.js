const dbConnection = require("../config/mongoConnection");
const data = require("../data");
const movies = data.movies;
const comments = data.comments;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    const movieData1 = {
        "title": "Movie1",
        "cast": [{firstName: "Name1", lastName:"Name1"},{firstName: "Name1", lastName:"Name1"}],
        "info": {director: "Director1", yearReleased: 1981},  
        "plot": "SomePlot1.",
        "rating": 1
    };
    const movieData2 = {
        "title": "Movie2",
        "cast": [{firstName: "Name2", lastName:"Name2"},{firstName: "Name2", lastName:"Name2"}],
        "info": {director: "Director1", yearReleased: 1982},  
        "plot": "SomePlot2.",
        "rating": 2
    };
    const movieData3 = {
        "title": "Movie3",
        "cast": [{firstName: "Name3", lastName:"Name3"},{firstName: "Name3", lastName:"Name3"}],
        "info": {director: "Director1", yearReleased: 1983},  
        "plot": "SomePlot3.",
        "rating": 3
    };const movieData4 = {
        "title": "Movie4",
        "cast": [{firstName: "Name4", lastName:"Name4"},{firstName: "Name4", lastName:"Name4"}],
        "info": {director: "Director1", yearReleased: 1984},  
        "plot": "SomePlot4.",
        "rating": 4
    };const movieData5 = {
        "title": "Movie5",
        "cast": [{firstName: "Name5", lastName:"Name5"},{firstName: "Name5", lastName:"Name5"}],
        "info": {director: "Director1", yearReleased: 1985},  
        "plot": "SomePlot5.",
        "rating": 5
    };const movieData6 = {
        "title": "Movie6",
        "cast": [{firstName: "Name6", lastName:"Name6"},{firstName: "Name6", lastName:"Name6"}],
        "info": {director: "Director1", yearReleased: 1986},  
        "plot": "SomePlot6.",
        "rating": 1
    };const movieData7 = {
        "title": "Movie7",
        "cast": [{firstName: "Name7", lastName:"Name7"},{firstName: "Name7", lastName:"Name7"}],
        "info": {director: "Director1", yearReleased: 1987},  
        "plot": "SomePlot7.",
        "rating": 2
    };const movieData8 = {
        "title": "Movie8",
        "cast": [{firstName: "Name8", lastName:"Name8"},{firstName: "Name8", lastName:"Name8"}],
        "info": {director: "Director1", yearReleased: 1988},  
        "plot": "SomePlot8.",
        "rating": 3
    };const movieData9 = {
        "title": "Movie9",
        "cast": [{firstName: "Name9", lastName:"Name9"},{firstName: "Name9", lastName:"Name9"}],
        "info": {director: "Director1", yearReleased: 1989},  
        "plot": "SomePlot9.",
        "rating": 4
    };const movieData10 = {
        "title": "Movie10",
        "cast": [{firstName: "Name10", lastName:"Name10"},{firstName: "Name10", lastName:"Name10"}],
        "info": {director: "Director1", yearReleased: 1990},  
        "plot": "SomePlot10.",
        "rating": 5
    };const movieData11 = {
        "title": "Movie11",
        "cast": [{firstName: "Name11", lastName:"Name11"},{firstName: "Name11", lastName:"Name11"}],
        "info": {director: "Director1", yearReleased: 1991},  
        "plot": "SomePlot11.",
        "rating": 1
    };const movieData12 = {
        "title": "Movie12",
        "cast": [{firstName: "Name12", lastName:"Name12"},{firstName: "Name12", lastName:"Name12"}],
        "info": {director: "Director1", yearReleased: 1992},  
        "plot": "SomePlot12.",
        "rating": 2
    };const movieData13 = {
        "title": "Movie13",
        "cast": [{firstName: "Name13", lastName:"Name13"},{firstName: "Name13", lastName:"Name13"}],
        "info": {director: "Director1", yearReleased: 1993},  
        "plot": "SomePlot13.",
        "rating": 3
    };const movieData14 = {
        "title": "Movie14",
        "cast": [{firstName: "Name14", lastName:"Name14"},{firstName: "Name14", lastName:"Name14"}],
        "info": {director: "Director1", yearReleased: 1994},  
        "plot": "SomePlot14.",
        "rating": 4
    };const movieData15 = {
        "title": "Movie15",
        "cast": [{firstName: "Name15", lastName:"Name15"},{firstName: "Name15", lastName:"Name15"}],
        "info": {director: "Director1", yearReleased: 1995},  
        "plot": "SomePlot15.",
        "rating": 5
    };const movieData16 = {
        "title": "Movie16",
        "cast": [{firstName: "Name16", lastName:"Name16"},{firstName: "Name16", lastName:"Name16"}],
        "info": {director: "Director1", yearReleased: 1996},  
        "plot": "SomePlot16.",
        "rating": 1
    };const movieData17 = {
        "title": "Movie17",
        "cast": [{firstName: "Name17", lastName:"Name17"},{firstName: "Name17", lastName:"Name17"}],
        "info": {director: "Director1", yearReleased: 1997},  
        "plot": "SomePlot17.",
        "rating": 2
    };const movieData18 = {
        "title": "Movie18",
        "cast": [{firstName: "Name18", lastName:"Name18"},{firstName: "Name18", lastName:"Name18"}],
        "info": {director: "Director1", yearReleased: 1998},  
        "plot": "SomePlot18.",
        "rating": 3
    };const movieData19 = {
        "title": "Movie19",
        "cast": [{firstName: "Name19", lastName:"Name19"},{firstName: "Name19", lastName:"Name19"}],
        "info": {director: "Director1", yearReleased: 1999},  
        "plot": "SomePlot19.",
        "rating": 4
    };const movieData20 = {
        "title": "Movie20",
        "cast": [{firstName: "Name20", lastName:"Name20"},{firstName: "Name20", lastName:"Name20"}],
        "info": {director: "Director1", yearReleased: 2000},  
        "plot": "SomePlot20.",
        "rating": 5
    };const movieData21 = {
        "title": "Movie21",
        "cast": [{firstName: "Name21", lastName:"Name21"},{firstName: "Name21", lastName:"Name21"}],
        "info": {director: "Director1", yearReleased: 2001},  
        "plot": "SomePlot21.",
        "rating": 1
    };const movieData22 = {
        "title": "Movie22",
        "cast": [{firstName: "Name22", lastName:"Name22"},{firstName: "Name22", lastName:"Name22"}],
        "info": {director: "Director1", yearReleased: 2002},  
        "plot": "SomePlot22.",
        "rating": 2
    };const movieData23 = {
        "title": "Movie23",
        "cast": [{firstName: "Name23", lastName:"Name23"},{firstName: "Name23", lastName:"Name23"}],
        "info": {director: "Director1", yearReleased: 2003},  
        "plot": "SomePlot23.",
        "rating": 3
    };const movieData24 = {
        "title": "Movie24",
        "cast": [{firstName: "Name24", lastName:"Name24"},{firstName: "Name24", lastName:"Name24"}],
        "info": {director: "Director1", yearReleased: 2004},  
        "plot": "SomePlot24.",
        "rating": 4
    };const movieData25 = {
        "title": "Movie25",
        "cast": [{firstName: "Name25", lastName:"Name25"},{firstName: "Name25", lastName:"Name25"}],
        "info": {director: "Director1", yearReleased: 2005},  
        "plot": "SomePlot25.",
        "rating": 5
    };const movieData26 = {
        "title": "Movie26",
        "cast": [{firstName: "Name26", lastName:"Name26"},{firstName: "Name26", lastName:"Name26"}],
        "info": {director: "Director1", yearReleased: 2006},  
        "plot": "SomePlot26.",
        "rating": 1
    };const movieData27 = {
        "title": "Movie27",
        "cast": [{firstName: "Name27", lastName:"Name27"},{firstName: "Name27", lastName:"Name27"}],
        "info": {director: "Director1", yearReleased: 2007},  
        "plot": "SomePlot28.",
        "rating": 2
    };const movieData28 = {
        "title": "Movie28",
        "cast": [{firstName: "Name28", lastName:"Name28"},{firstName: "Name28", lastName:"Name28"}],
        "info": {director: "Director1", yearReleased: 2008},  
        "plot": "SomePlot28.",
        "rating": 3
    };const movieData29 = {
        "title": "Movie29",
        "cast": [{firstName: "Name29", lastName:"Name29"},{firstName: "Name29", lastName:"Name29"}],
        "info": {director: "Director1", yearReleased: 2009},  
        "plot": "SomePlot29.",
        "rating": 4
    };const movieData30 = {
        "title": "Movie30",
        "cast": [{firstName: "Name30", lastName:"Name30"},{firstName: "Name30", lastName:"Name30"}],
        "info": {director: "Director1", yearReleased: 2010},  
        "plot": "SomePlot30.",
        "rating": 5
    }

    const commentData1 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData2 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData3 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData4 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData5 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData6 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData7 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData8 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData9 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData10 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData11 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData12 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData13 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData14 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData15 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData16 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData17 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData18 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData19 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData20 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData21 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData22 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData23 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData24 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData25 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData26 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData27 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData28 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData29 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData30 = {
        "name": "name1",
        "comment": "comment1"
    };
    const commentData31 = {
        "name": "name1",
        "comment": "comment1"
    };

    var { title, cast, info, plot, rating } = movieData1
    var movie1 = await movies.createMovie(title, cast, info, plot, rating);
    var { name, comment } = commentData1
    var comment1 = await comments.createComment(name, comment, movie1._id);
    var { name, comment } = commentData2
    var comment1 = await comments.createComment(name, comment, movie1._id);
    var { name, comment } = commentData3
    var comment1 = await comments.createComment(name, comment, movie1._id);
    var { name, comment } = commentData4
    var comment1 = await comments.createComment(name, comment, movie1._id);
    var { name, comment } = commentData5
    var comment1 = await comments.createComment(name, comment, movie1._id);

    var { title, cast, info, plot, rating } = movieData2
    var movie2 = await movies.createMovie(title, cast, info, plot, rating);
    var { name, comment } = commentData6
    var comment1 = await comments.createComment(name, comment, movie2._id);
    var { name, comment } = commentData7
    var comment1 = await comments.createComment(name, comment, movie2._id);
    var { name, comment } = commentData8
    var comment1 = await comments.createComment(name, comment, movie2._id);
    var { name, comment } = commentData9
    var comment1 = await comments.createComment(name, comment, movie2._id);
    var { name, comment } = commentData10
    var comment1 = await comments.createComment(name, comment, movie2._id);

    var { title, cast, info, plot, rating } = movieData3
    var movie3 = await movies.createMovie(title, cast, info, plot, rating);
    var { name, comment } = commentData11
    var comment1 = await comments.createComment(name, comment, movie3._id);
    var { name, comment } = commentData12
    var comment1 = await comments.createComment(name, comment, movie3._id);
    var { name, comment } = commentData13
    var comment1 = await comments.createComment(name, comment, movie3._id);
    var { name, comment } = commentData14
    var comment1 = await comments.createComment(name, comment, movie3._id);
    var { name, comment } = commentData15
    var comment1 = await comments.createComment(name, comment, movie3._id);
    var { name, comment } = commentData16
    var comment1 = await comments.createComment(name, comment, movie3._id);

    var { title, cast, info, plot, rating } = movieData4
    var movie4 = await movies.createMovie(title, cast, info, plot, rating);
    var { name, comment } = commentData17
    var comment1 = await comments.createComment(name, comment, movie4._id);
    var { name, comment } = commentData18
    var comment1 = await comments.createComment(name, comment, movie4._id);
    var { name, comment } = commentData19
    var comment1 = await comments.createComment(name, comment, movie4._id);
    var { name, comment } = commentData20
    var comment1 = await comments.createComment(name, comment, movie4._id);
    var { name, comment } = commentData21
    var comment1 = await comments.createComment(name, comment, movie4._id);


    var { title, cast, info, plot, rating } = movieData5
    var movie5 = await movies.createMovie(title, cast, info, plot, rating);
    var { name, comment } = commentData22
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData23
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData24
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData25
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData26
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData27
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData28
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData29
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData30
    var comment1 = await comments.createComment(name, comment, movie5._id);
    var { name, comment } = commentData31
    var comment1 = await comments.createComment(name, comment, movie5._id);


    var { title, cast, info, plot, rating } = movieData6
    var movie6 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData7
    var movie7 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData8
    var movie8 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData9
    var movie9 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData10
    var movie10 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData11
    var movie11 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData12
    var movie12 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData13
    var movie13 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData14
    var movie14 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData15
    var movie15 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData16
    var movie16 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData17
    var movie17 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData18
    var movie18 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData19
    var movie19 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData20
    var movie20 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData21
    var movie21 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData22
    var movie22 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData23
    var movie23 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData24
    var movie24 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData25
    var movie25 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData26
    var movie26 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData27
    var movie27 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData28
    var movie28 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData29
    var movie29 = await movies.createMovie(title, cast, info, plot, rating);

    var { title, cast, info, plot, rating } = movieData30
    var movie30 = await movies.createMovie(title, cast, info, plot, rating);
    
    


    await db.serverConfig.close();
}

main().catch(console.log); 