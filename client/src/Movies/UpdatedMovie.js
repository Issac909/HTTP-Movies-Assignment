import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdatedMovie = props => {
    const [movie, setMovie] = useState(props.movie);
    console.log(movie);
    console.log(props);

    useEffect(() => {
        const movieEdit = props.movies.find(
            identity => `${identity.id}` === props.match.params.id
        );
        if (movieEdit) {
            setMovie(movieEdit);
        }
    },[props.movie]);

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                // setMovie({
                //     title: '',
                //     director: '',
                //     stars: []
                // })
                props.history.push('/')
            })
            .catch(err => console.log(err));   
    };

    // const handleActors = e => {
    //     e.preventDefault();
    //     axios
    //         .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => console.log(err))
    // }



    return (
        <div className = 'movie-card'>
            <p>Update the movie using this form.</p>
            <form onSubmit = {handleSubmit}>
                <label htmlFor = 'title'>Movie Title: 
                    <input 
                        placeholder = 'Title'
                        name = 'title'
                        type = 'text'
                        value = {movie.title}
                        onChange = {handleChange}
                    />
                </label>
                <label htmlFor = 'director'>Director:
                    <input 
                        placeholder = 'Director'
                        name = 'director'
                        type = 'text'
                        value = {movie.director}
                        onChange = {handleChange}
                    /> 
                </label>
                <label htmlFor = 'metascore'>Metascore: 
                    <input
                        placeholder = '94'
                        name = 'metascore'
                        type = 'text'
                        value = {movie.metascore}
                        onChange = {handleChange}
                    />
                </label>
                <label htmlFor = 'Actors'>Actors:
                    <input
                        placeholder = 'Actor'
                        name = 'stars'
                        type = 'text'
                        value = {movie.stars}
                        onChange = {handleChange}
                    />
                </label>
                <button type = 'submit'>Update</button>
            </form>
        </div>
    )
}

export default UpdatedMovie;