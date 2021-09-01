import logo from './marvel.jpeg';
import './App.css';
import React from 'react';
import Home from './components/Home.js';
import Characters from './components/Characters.js';
import Comics from './components/Comics.js';
import Series from './components/Series.js';
import SingleCharacter from './components/SingleCharacter';
import SingleComic from './components/SingleComic';
import SingleSeries from './components/SingleSeries';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src={logo} className="marvellogo" alt="logo" />
          <h1 className="App-title">
            Welcome to the React.js MARVEL API Lab
          </h1>
          <Link className="showlink" to="/">
            Home
          </Link>
          <Link className="showlink" to="/characters/page/0">
            Characters
          </Link>
          <Link className="showlink" to="/comics/page/0">
            Comics
          </Link>
          <Link className="showlink" to="/series/page/0">
            Series
          </Link>
        </header>
        <br />
        <br />
        <div className="App-body">
          <Route exact path="/" component={Home} />
        </div>
        <div className="App-body">
          <Route exact path="/characters/page/:pagenum" component={Characters} />
        </div>
        <div className="App-body">
          <Route exact path="/characters/:id" component={SingleCharacter} />
        </div>
        <div className="App-body">
          <Route exact path="/comics/page/:pagenum" component={Comics} />
        </div>
        <div className="App-body">
          <Route exact path="/comics/:id" component={SingleComic} />
        </div>
        <div className="App-body">
          <Route exact path="/series/page/:pagenum" component={Series} />
        </div>
        <div className="App-body">
          <Route exact path="/series/:id" component={SingleSeries} />
        </div>
      </div>
    </Router>
  );
}

export default App;


// Your public key
// 45408955448ee04cf6fac893ed3d69e3
// Your private key
// 8831a079ecca79f705ee4ad80e85b0a5a95f7244