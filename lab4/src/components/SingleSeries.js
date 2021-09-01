import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../noimage.png';
const md5 = require('blueimp-md5');
const publickey = '45408955448ee04cf6fac893ed3d69e3';
const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&id=";

const SingleComic = (props) => {
    const [comicData, setComicData] = useState(undefined);
    const [loading, setLoading] = useState(true);
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
            const { data } = await axios.get(url + props.match.params.id);
            setComicData(data);
            setLoading(false);
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
        }
        fetchData();
      }, [props.match.params.id]);

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
        variantsli = comicData && comicData.data.results[0].variants.map((comicnum) =>{
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
        charli = comicData && comicData.data.results[0].characters.items.map((charnum) =>{
            return (
                <li >
                  {charnum.name}
                </li>
            );
        });
    }
    if (loading) {
      return (
        <div>
          <h2>Loading....</h2>
        </div>
      );
    } else {
      if (title == "N/A"){
        return (
          <h1>ERROR 404</h1>
        );
      } else {
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
        }
    }
};

export default SingleComic;