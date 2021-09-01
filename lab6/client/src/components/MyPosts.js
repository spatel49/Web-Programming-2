import React from 'react';
import { useQuery } from "@apollo/client";
import "./App.css";
import queries from '../queries';
import SingleImage from "./SingleImage.js";
import NewPost from "./NewPost.js";

const MyPosts = () => {
  const { loading, error, data } = useQuery(queries.GET_IMAGES_UP, {
    errorPolicy: "ignore", fetchPolicy: "no-cache"
  });

  if (loading) return <p>Loading</p>;

  if (error) {
    console.log(error);
    return <h1>{error}</h1>;
  }

  const images = data.userPostedImages.map((img) => {
    if (img) {
      return <SingleImage image={img} type="post"></SingleImage>;
    }
  });

  return (
    <div>
      <h1 className="mainheader">My Posts</h1>
      <h4>Add New Post:</h4>
      <NewPost  />
      {images}
    </div>
  );
};

export default MyPosts;
