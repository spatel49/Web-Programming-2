import React from 'react';
import { useState } from 'react';
import { useMutation } from "@apollo/client";
import "./App.css";
import queries from '../queries';

const NewPost = () => {
  let [uploadImage] = useMutation(queries.UPLOAD_IMAGE);
  let [URL, setURL] = useState("");
  let [Des, setDes] = useState("");
  let [posterName, setposterName] = useState("");
  let [submitted, setSubmitted] = useState("");

  const handleURL = e => {
    setSubmitted("");
    setURL(e.target.value);  
  };

  const handleposterName= e => {
    setposterName(e.target.value);  
  };

  const handleDes = e => {
    setDes(e.target.value);  
  };

  if (submitted.length > 0){
    return (
      <div>
        <form
      method="POST "
      onSubmit={(e) => {
        e.preventDefault();
        uploadImage({
          variables: { posterName: posterName, url: URL, description: Des },
        });
        setposterName("");
        setURL("");
        setDes("");
        setSubmitted("true");
      }}
      name="formName"
      className="formcenter"
    >
      <label className="labelclass">
        <span>   URL: </span>
        <input
          autoComplete="off"
          type="text"
          name="searchTerm"
          onChange={handleURL}
        />
      </label>
      <label className="labelclass">
        <span>   Poster Name: </span>
        <input
          autoComplete="off"
          type="text"
          name="searchTerm"
          onChange={handleposterName}
        />
      </label>
      <label className="labelclass">
        <span>   Description: </span>
        <input
          autoComplete="off"
          type="text"
          name="searchTerm"
          onChange={handleDes}
        />
      </label>
      <button type="submit">
          Submit
        </button>
    </form>
    <h1>Submitted! Refresh 'My Posts' Page.</h1>
    </div>
    );
  } else {
    return (
      <div>
        <form
      method="POST "
      onSubmit={(e) => {
        e.preventDefault();
        uploadImage({
          variables: { posterName: posterName, url: URL, description: Des },
        });
        setposterName("");
        setURL("");
        setDes("");
        setSubmitted("true");
      }}
      name="formName"
      className="formcenter"
    >
      <label className="labelclass">
        <span>   URL: </span>
        <input
          autoComplete="off"
          type="text"
          name="searchTerm"
          onChange={handleURL}
        />
      </label>
      <label className="labelclass">
        <span>   Poster Name: </span>
        <input
          autoComplete="off"
          type="text"
          name="searchTerm"
          onChange={handleposterName}
        />
      </label>
      <label className="labelclass">
        <span>   Description: </span>
        <input
          autoComplete="off"
          type="text"
          name="searchTerm"
          onChange={handleDes}
        />
      </label>
      <button type="submit">
          Submit
        </button>
    </form>
    </div>
    );
  }
  
};

export default NewPost;
