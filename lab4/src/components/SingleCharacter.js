import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from './../noimage.png';
const md5 = require('blueimp-md5');
const publickey = '45408955448ee04cf6fac893ed3d69e3';
const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&id=";

const SingleCharacter = (props) => {
    const [loading, setLoading] = useState(true);
    const [characterData, setCharacterData] = useState(undefined);
    let img = "N/A";
    let name = "N/A";
    let description = "N/A";
    let comicsli = "N/A";
    let seriesli = "N/A";
    let charurl = "N/A";
    let li = null;

    useEffect(() => {
        console.log("render");
        async function fetchData() {
          try {
            const { data } = await axios.get(url + props.match.params.id);
            setCharacterData(data);
            setLoading(false);
          } catch (e) {
            console.log(e);
          }
          setLoading(false);
        }
        fetchData();
      }, [props.match.params.id]);

      li = characterData && characterData.data.results.map((character) =>{
        if (character.name){
            name = character.name;
        }
        if (character.urls[0]){
            charurl = character.urls[0].url;
        }
        if (character.description && character.description.length > 0){
            description = character.description;
        } else {
          description = "N/A";
        }
        if (character.thumbnail){
            img = <img className="singleImg" alt="Character" src={`${character.thumbnail.path}.jpg`} />;
        } else {
            img = <img className="singleImg" alt="Character" src={noImage} />;
        }
        return (
            <p key={character.id}>
              {img}
              </p>
        );
    });

    if (characterData && characterData.data.results[0].comics.available > 0){
        comicsli = characterData.data.results[0].comics.items.map((comicnum) =>{
            return (
              <p>
                  {comicnum.name}
                </p>
            );
        });
    }

    if (characterData && characterData.data.results[0].series.available > 0){
        seriesli = characterData.data.results[0].series.items.map((seriesnum) =>{
            return (
              <p>
              {seriesnum.name}
            </p>
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
      if (name == "N/A"){
        return (
          <h1>ERROR 404</h1>
        );
      } else {
        return (
          <div className="App-body">
              <h1>{name}</h1>
              {li}
              <h2>Description: </h2>
              <p>{description}</p>
              <h2>Comics: </h2>
              <ul>{comicsli} </ul>
              <h2>Series:</h2>
              <ul>{seriesli} </ul>
              <h2>Link: </h2>
              <p><a href={charurl}>{charurl}</a></p>
          </div>
        );
      }
    }
};

export default SingleCharacter;