import './App.css';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Images from './Images';
import myBin from './MyBin';
import myPosts from './MyPosts';
import NewPost from './NewPost';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <header className="App-header">
            <h1 className="mainTitle">
              Binterest
            </h1>
            <nav>
              <NavLink className="navlink" to="/my-bin">
                my bin
              </NavLink>

              <NavLink className="navlink" to="/">
                images
              </NavLink>

              <NavLink className="navlink" to="/my-posts">
                my posts
              </NavLink>

              <NavLink className="navlink" to="/new-post">
                new post
              </NavLink>
            </nav>
          </header>
          <Route exact path="/" component={Images} />
          <Route path="/my-bin/" component={myBin} />
          <Route path="/my-posts/" component={myPosts} />
          <Route path="/new-post/" component={NewPost} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
