import React from 'react';
import { useQuery } from "@apollo/client";
import SingleImage from "./SingleImage.js";
import "./App.css";
import queries from '../queries';

const MyBin = () => {
  const { loading, error, data } = useQuery(queries.GET_IMAGES_B, {
    errorPolicy: "ignore" , fetchPolicy: "no-cache"
  });

  if (loading) return <p>Loading</p>;

  if (error) {
    console.log(error);
    return <h1>{error}</h1>;
  }

  const imgs = data.binnedImages.map((img) => {
    return <SingleImage image={img} type="bin"></SingleImage>;
  });

  return (
    <div className="parentdiv">
      <h1 className="mainheader">My Bin</h1>
      {imgs}
    </div>
  );
};

export default MyBin;
