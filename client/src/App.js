import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm';


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };


  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} setMovieList = {setMovieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      
      <Route 
        exact path = '/update-movie/:id'
        render = {props => (<UpdateMovieForm {...props} />)}
      />
    </>
  );
};

export default App;
