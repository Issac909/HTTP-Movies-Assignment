import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

import axios from 'axios';

function MovieList({ movies, setMovieList }) {

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getMovieList()
  }, [movies])

  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
