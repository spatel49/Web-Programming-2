import { useState } from "react";
import React from 'react'
import { useQuery } from "@apollo/client";
import SingleImage from "./SingleImage";
import "./App.css";
import queries from '../queries';

const Images = () => {
  let [pageNum, setPageNum] = useState(1);

  const { loading, error, data } = useQuery(queries.GET_IMAGES, {
    variables: { pageNum }, fetchPolicy: "no-cache"
  });

  if (loading) return <p>Loading</p>;

  if (error) {
    console.log(error);
    return <h1>{error}</h1>;
  }
  
  const final_list = data.unsplashImages.map((img) => {
    return <SingleImage image={img} type="bin"></SingleImage>;
  });


  return (
    <div>
      <h1 className="mainheader">Images</h1>
      {final_list}
      <div>
        <button onClick={() => { setPageNum(pageNum + 1); }} >
        Get More
      </button>
      </div>
    </div>
  );
};

export default Images;
