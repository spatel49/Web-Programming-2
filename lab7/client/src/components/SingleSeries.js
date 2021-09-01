import React, { useEffect } from 'react';

// Redux 
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';


import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../noimage.png';


const SingleComic = (props) => {
    const dispatch = useDispatch(); 
    let img = "N/A";
    let title = "N/A";
    let description = "N/A";
    let pageCount = "N/A";
    let variantsli = "N/A";
    let charli = "N/A";
    let comicurl = "N/A";
    let li = "N/A";


    useEffect(() => {
        console.log("render");
        async function fetchData() {
          try {
            const { data } = await axios.get("/series/" + props.match.params.id);
            dispatch(actions.setPage("SingleSeries/" + props.match.params.id, data));
          } catch (e) {
            console.log(e);
          }
        }
        fetchData();
      }, [props.match.params.id]);

      const charactersPage = useSelector((state) => state.charactersPage);
      let copyState = [...charactersPage];
      let index = copyState.findIndex((x) => x.pageTerm === "SingleSeries/" + props.match.params.id);
      let currentState = copyState[index];
      let comicData = "";
      if (currentState){
        comicData = currentState.charactersData;
      }

      li = comicData && comicData.data.results.map((comic) =>{
        if (comic.thumbnail){
            img = <img className="singleImg" alt="comic" src={`${comic.thumbnail.path}.jpg`} />;
        }
        if (comic.title){
            title = comic.title;
        }
        if (comic.urls[0]){
            comicurl = comic.urls[0].url;
        } else {
          comicurl = "N/A";
        }
        if (comic.description && comic.description.length > 0){
            description = comic.description;
        }
        if (comic.pageCount){
            pageCount = comic.pageCount;
        }
          return (
              <li key={comic.id}>
                <Link to={`/comics/${comic.id}`}>
                    {/* {img} <br /> */}
                    {comic.title}
                </Link>
                </li>
          );
    });

    if (comicData && comicData.data.results[0].variants){
        variantsli = comicData.data.results[0].variants.map((comicnum) =>{
            return (
                <li >
                  <a href={comicnum.resourceURI}>{comicnum.resourceURI}</a>
                </li>
            );
        });
    }

    if (variantsli.length <= 0){
      variantsli = "N/A";
    }

    if (comicData && comicData.data.results[0].characters.available > 0){
        charli = comicData.data.results[0].characters.items.map((charnum) =>{
            return (
                <li >
                  {charnum.name}
                </li>
            );
        });
    }
      if (comicData){
        return (
          <div className="App-body">
              <h2>{title}</h2>
              {img}
              <h2>Description:</h2>
              <p>{description}</p>
              <h2>Number of Pages: </h2>
              <p>{pageCount}</p>
              <h2>Variants:</h2>
              <ul>{variantsli} </ul>
              <h2>Characters: </h2>
              <ul>{charli} </ul>
              <p>Link: <a href={comicurl}>{comicurl}</a></p>
          </div>
        );
      } else {
        return (
          <h1>ERROR 404</h1>
        );
      }
};

export default SingleComic;