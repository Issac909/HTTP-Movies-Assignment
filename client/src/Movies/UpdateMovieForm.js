import React, { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: [
    {
      name: ""
    }
  ]
};

const UpdateMovieForm = props => {
  const [movie, setMovie] = useState({});
  const id = props.match.params.id
//   const [stars, setStars] = useState({});
//   console.log(stars);

  const handleChange = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };


  const handleStarChange = e => {
    setMovie({
      ...movie,
      stars: [e.target.value]
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            setMovie({})
            props.history.push(`/`);
        })
        .catch(err => console.log(err));
  }


  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <h2>Update Movie</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="name"
          value={movie.title}
        />

        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={movie.director}
        />

        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={movie.metascore}
        />

        <input
          type="text"
          name="name"
          onChange={handleStarChange}
          placeholder="name"
          value={movie.stars}
        />

        <button type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
