import React, { useState, useEffect } from 'react';

// Redux 
import { useSelector, useDispatch } from 'react-redux';
import actions from '../actions';


import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import noImage from '../noimage.png';
import SearchSeries from './Search';


const Series = (props) => {
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
                    const { data } = await axios.get("/series/page/" + props.match.params.pagenum);
                    dispatch(actions.setPage("Series/" + props.match.params.pagenum, data));
                } catch (e) {
                    console.log(e);
                }
            }
        }
        fetchData();
      }, [props.match.params.pagenum]);

      useEffect(() => {
        console.log('search useEffect fired');
        async function fetchData() {
            try {
                console.log(`in fetch searchTerm: ${searchTerm}`);
                const { data } = await axios.get("/series/title/" + searchTerm);
                dispatch(actions.setSearch("Series/" + searchTerm, data));
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
      let index = copyState.findIndex((x) => x.pageTerm === "Series/" + props.match.params.pagenum);
      let currentState = copyState[index];
      let seriesData = "";
      if (currentState){
        seriesData = currentState.charactersData;
      }

      if (seriesData){
          total = seriesData.data.total;
      }
      
      const searchPage = useSelector((state) => state.searchPage);
      copyState = [...searchPage];
      index = copyState.findIndex((x) => x.searchTerm === "Series/" + searchTerm);
      currentState = copyState[index];
      let searchData = "";
      if (currentState){
        searchData = currentState.searchData;
      }

      li = seriesData && seriesData.data.results.map((comic) =>{
          if (comic.thumbnail){
              img = <img className="allimages" alt="comic" src={`${comic.thumbnail.path}.jpg`} />;
          } else {
              img = <img className="allimages" alt="comic" src={noImage} />;
          }
          return (
              <li key={comic.id}>
                <Link to={`/series/${comic.id}`}>
                    {img} <br />
                    {comic.title}
                </Link>
                </li>
          );
    });

    if (searchTerm) {
        li = searchData && searchData.data.results.map((comic) =>{
            if (comic.thumbnail){
                img = <img className="allimages" alt="comic" src={`${comic.thumbnail.path}.jpg`} />;
            } else {
                img = <img className="allimages" alt="comic" src={noImage} />;
            }
            return (
                <li key={comic.id}>
                  <Link to={`/series/${comic.id}`}>
                      {img} <br />
                      {comic.title}
                  </Link>
                  </li>
            );
      });
    }
        if (Number.isInteger(parseInt(props.match.params.pagenum)) && parseInt(props.match.params.pagenum) < parseInt(total) && parseInt(props.match.params.pagenum) >= 0){
            if (searchTerm) {
                return ( 
                    <div className="App-body">
                        <SearchSeries searchValue={searchValue} />
                        <ul>
                            {li}
                        </ul>
                    </div>
                );
            } else {
                if (parseInt(props.match.params.pagenum) === 0){
                    return(
                        <div className="App-body">
                            <SearchSeries searchValue={searchValue} />
                        <Link className="showlink" to={`/series/page/${parseInt(props.match.params.pagenum) + parseInt(1)}`}>
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
                            <SearchSeries searchValue={searchValue} />
                        <Link className="showlink" to={`/series/page/${parseInt(props.match.params.pagenum) - parseInt(1)}`}>
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
                            <SearchSeries searchValue={searchValue} />
                        <Link className="showlink" to={`/series/page/${parseInt(props.match.params.pagenum) - parseInt(1)}`}>
                            Prev
                        </Link>
                        <Link className="showlink" to={`/series/page/${parseInt(props.match.params.pagenum) + parseInt(1)}`}>
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

export default Series;