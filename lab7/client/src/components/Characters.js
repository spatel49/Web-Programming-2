import React, { useState, useEffect } from 'react';

// Redux 
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';

import '../App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import noImage from '../noimage.png';
import SearchCharacters from './Search';

const Characters = (props) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    
    let li = null;
    let img = null;
    let total = 0;

    useEffect(() => {
        console.log("render");
        async function fetchData() {
            if (parseInt(props.match.params.pagenum) >= 0){
                try {
                    const { data } = await axios.get("/characters/page/" + props.match.params.pagenum);
                    dispatch(actions.setPage("Characters/" + props.match.params.pagenum, data));
                } catch (e) {
                    console.log(e);
                }
            }
        }
        fetchData();
      }, [props.match.params.pagenum]);
     // dispatch(actions.addUser('Mickey Mouse', 'MMouse@disney.com'));
      useEffect(() => {
        console.log('search useEffect fired');
        async function fetchData() {
            try {
                console.log(`in fetch searchTerm: ${searchTerm}`);
                const { data } = await axios.get("/characters/name/" + searchTerm);
                dispatch(actions.setSearch("Characters/" + searchTerm, data));
            } catch (e) {
                console.log(e);
            }
        }
        if (searchTerm) {
          console.log('searchTerm is set');
          fetchData();
        }
      }, [searchTerm]);
    
      const searchValue = async (value) => {
        setSearchTerm(value);
      };

      const charactersPage = useSelector((state) => state.charactersPage);
      let copyState = [...charactersPage];
      let index = copyState.findIndex((x) => x.pageTerm === "Characters/" + props.match.params.pagenum);
      let currentState = copyState[index];
      let pageData = "";
      if (currentState){
        pageData = currentState.charactersData;
      }

      if (pageData){
          total = pageData.data.total;
      }
      
      const searchPage = useSelector((state) => state.searchPage);
      copyState = [...searchPage];
      index = copyState.findIndex((x) => x.searchTerm === "Characters/" + searchTerm);
      currentState = copyState[index];
      let searchData = "";
      if (currentState){
        searchData = currentState.searchData;
      }

      li = pageData && pageData.data.results.map((character) =>{
          if (character.thumbnail){
              img = <img className="allimages" alt="Character" src={`${character.thumbnail.path}.jpg`} />;
          } else {
              img = <img alt="Character" src={noImage} />;
          }
          return (
              <li key={character.id}>
                <Link className="charName" to={`/characters/${character.id}`}>
                    {img} <br />
                    {character.name}
                </Link>
                </li>
          );
        });

    if (searchTerm){
        li = searchData && searchData.data.results.map((character) =>{
            if (character.thumbnail){
                img = <img className="allimages" alt="Character" src={`${character.thumbnail.path}.jpg`} />;
            } else {
                img = <img alt="Character" src={noImage} />;
            }
            return (
                <li key={character.id}>
                  <Link className="charName" to={`/characters/${character.id}`}>
                      {img} <br />
                      {character.name}
                  </Link>
                  </li>
            );
      });
    }

    if (Number.isInteger(parseInt(props.match.params.pagenum)) && parseInt(props.match.params.pagenum) < parseInt(total) && parseInt(props.match.params.pagenum) >= 0){
        if (searchTerm) {
            return(
                <div className="App-body">
                        <SearchCharacters searchValue={searchValue} />
                        <ul>
                            {li}
                        </ul>
                    </div>
            );
        } else {
            if (parseInt(props.match.params.pagenum) === 0){
                return(
                    <div className="App-body">
                        <SearchCharacters searchValue={searchValue} />
                    <Link className="showlink" to={`/characters/page/${parseInt(props.match.params.pagenum) + parseInt(1)}`}>
                    Next
                        </Link>
                        <ul>
                            {li}
                        </ul>
                    </div>
                );
            } else if (parseInt(props.match.params.pagenum) === parseInt(total) - 1){
                return (
                    <div className="App-body">
                        <SearchCharacters searchValue={searchValue} />
                    <Link className="showlink" to={`/characters/page/${parseInt(props.match.params.pagenum) - parseInt(1)}`}>
                        Prev
                    </Link>
                    <ul>
                            {li}
                        </ul>
                    </div>
                );
            } else {
                return ( 
                    <div className="App-body">
                        <SearchCharacters searchValue={searchValue} />
                    <Link className="showlink" to={`/characters/page/${parseInt(props.match.params.pagenum) - parseInt(1)}`}>
                        Prev
                    </Link>
                    <Link className="showlink" to={`/characters/page/${parseInt(props.match.params.pagenum) + parseInt(1)}`}>
                        Next
                    </Link>
                        <ul>
                            {li}
                        </ul>
                    </div>
                );
            }
        }
    } else {
        return (
            <div>
            <p>ERROR 404</p>
         </div>
        );
    }
};

export default Characters;