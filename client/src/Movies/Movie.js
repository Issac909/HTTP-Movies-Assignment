import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link } from 'react-router-dom';
import MovieCard from './MovieCard';


function Movie({ addToSavedList }, props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${match.params.id}`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link to = {`/update-movie/${match.params.id}`}><button>Edit</button></Link>
      <Link to = {'/'} onClick = {handleDelete}><button >Delete</button></Link>
    </div>
  );
}

export default Movie;
