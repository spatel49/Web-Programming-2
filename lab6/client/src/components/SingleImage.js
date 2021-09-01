import { useState, useEffect } from "react";
import React from 'react'
import { useMutation } from "@apollo/client";
import "./App.css";
import queries from '../queries';

const SingleImage = (props) => {
  let [updateImage] = useMutation(queries.UPDATE_IMAGE);
  let [Img, setImg] = useState(props.image);
  let [WebType, setWebType] = useState(props.type);

  useEffect(() => {
    setWebType(props.type);
  }, [props]);

  useEffect(() => {
    setImg(props.image);
  }, [props]);

  const main_Img = {
    id: Img.id,
    url: Img.url,
    posterName: Img.posterName,
    description: Img.description
  };

  let button = "";
  if (WebType == "bin"){
    if (Img.binned) {
      button = (
        <button onClick={() => {
            main_Img.binned = false;
            setImg(main_Img);
            updateImage({variables: main_Img});
          }}>Remove From Bin</button>
      );
    } else {
      button = (
        <button onClick={() => {
            main_Img.binned = true;
            setImg(main_Img);
            updateImage({variables: main_Img});
          }}>Add To Bin</button>
      );
    }
  } else {
    if (Img.userPosted) {
      button = (
        <button onClick={() => {
            main_Img.userPosted = false;
            setImg(main_Img);
            updateImage({variables: main_Img});
          }}>Remove From My Posts</button>
      );
    } else {
      button = (
        <button onClick={() => {
            main_Img.userPosted = true;
            setImg(main_Img);
            updateImage({variables: main_Img});
          }}>Add To My Posts</button>
      );
    }
  }

  return (
    <ul>
    <li className="imagelist">
      <img className="imagefix" src={Img.url}></img>
      <p className="imagetext">Author: {Img.userName}</p>
      <p className="imagetext">Description: {Img.description}</p>
      {button}
      </li>
    </ul>
  );
};

export default SingleImage;
