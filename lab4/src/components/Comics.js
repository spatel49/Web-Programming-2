import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchComics from './Search';
import noImage from '../noimage.png';
const md5 = require('blueimp-md5');
const publickey = '45408955448ee04cf6fac893ed3d69e3';
const privatekey = '8831a079ecca79f705ee4ad80e85b0a5a95f7244';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash + "&offset=";
const searchurl = baseUrl + '?titleStartsWith=';

const Comics = (props) => {
    const [loading, setLoading] = useState(true);
    const [comicsData, setComicsData] = useState(undefined);
    const [pageTerm, setPageTerm] = useState(props.match.params.page);
    const [searchData, setSearchData] = useState(undefined);
    const [searchTerm, setSearchTerm] = useState('');

    let li = null;
    let img = null;
    let total = 0;

    useEffect(() => {
        console.log("render");
        async function fetchData() {
            if (parseInt(props.match.params.pagenum) >= 0){
                try {
                    const { data } = await axios.get(url + props.match.params.pagenum);
                    setPageTerm(props.match.params.pagenum);
                    setComicsData(data);
                    setLoading(false);
                } catch (e) {
                    console.log(e);
                }
            }
            setLoading(false);
            setPageTerm(props.match.params.pagenum);
        }
        fetchData();
      }, [props.match.params.pagenum]);

      useEffect(() => {
        console.log('search useEffect fired');
        async function fetchData() {
            try {
                console.log(`in fetch searchTerm: ${searchTerm}`);
                const { data } = await axios.get(searchurl + searchTerm + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash);
                setSearchData(data);
                setLoading(false);
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


      if (comicsData){
        total = comicsData.data.total;
        }

      li = comicsData && comicsData.data.results.map((comic) =>{
          if (comic.thumbnail){
              img = <img className="allimages" alt="comic" src={`${comic.thumbnail.path}.jpg`} />;
          } else {
              img = <img className="allimages" alt="comic" src={noImage} />;
          }
          return (
              <li key={comic.id}>
                <Link to={`/comics/${comic.id}`}>
                    {img} <br />
                    {comic.title}
                </Link>
                </li>
          );
    });

    if (searchTerm){
        li = searchData && searchData.data.results.map((comic) =>{
            if (comic.thumbnail){
                img = <img className="allimages" alt="comic" src={`${comic.thumbnail.path}.jpg`} />;
            } else {
                img = <img className="allimages" alt="comic" src={noImage} />;
            }
            return (
                <li key={comic.id}>
                  <Link to={`/comics/${comic.id}`}>
                      {img} <br />
                      {comic.title}
                  </Link>
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
        if (!Number.isInteger(parseInt(pageTerm)) || parseInt(pageTerm) >= parseInt(total) || parseInt(pageTerm) < 0){
            return (
                <h1>ERROR 404</h1>
            );
        }
            if (searchTerm){
                return (
                    <div className="App-body">
                    <SearchComics searchValue={searchValue} />
                    <ul>
                        {li}
                    </ul>
                </div>
                );
            } else {
                if (parseInt(pageTerm) == 0){
                    return(
                        <div className="App-body">
                            <SearchComics searchValue={searchValue} />
                        <Link className="showlink" to={`/comics/page/${parseInt(pageTerm) + parseInt(1)}`}>
                        Next
                            </Link>
                            <ul>
                                {li}
                            </ul>
                        </div>
                    );
                } else if (parseInt(pageTerm) == parseInt(total) - 1){
                    return (
                        <div className="App-body">
                            <SearchComics searchValue={searchValue} />
                        <Link className="showlink" to={`/comics/page/${parseInt(pageTerm) - parseInt(1)}`}>
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
                            <SearchComics searchValue={searchValue} />
                        <Link className="showlink" to={`/comics/page/${parseInt(pageTerm) - parseInt(1)}`}>
                            Prev
                        </Link>
                        <Link className="showlink" to={`/comics/page/${parseInt(pageTerm) + parseInt(1)}`}>
                            Next
                        </Link>
                            <ul>
                                {li}
                            </ul>
                        </div>
                    );
                }
            }
    }
};

export default Comics;