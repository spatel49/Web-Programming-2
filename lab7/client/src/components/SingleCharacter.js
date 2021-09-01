import React, { useEffect } from 'react';

// Redux 
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';


import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from './../noimage.png';

const SingleCharacter = (props) => {
    const dispatch = useDispatch(); 

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
            const { data } = await axios.get("/characters/" + props.match.params.id);
            dispatch(actions.setPage("SingleCharacter/" + props.match.params.id, data));
          } catch (e) {
            console.log(e);
          }
        }
        fetchData();
      }, [props.match.params.id]);

      const charactersPage = useSelector((state) => state.charactersPage);
      let copyState = [...charactersPage];
      let index = copyState.findIndex((x) => x.pageTerm === "SingleCharacter/" + props.match.params.id);
      let currentState = copyState[index];
      let characterData = "";
      if (currentState){
        characterData = currentState.charactersData;
      }

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

    if (!characterData){
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
};

export default SingleCharacter;