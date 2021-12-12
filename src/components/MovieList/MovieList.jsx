import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { useHistory } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();

    const movies = useSelector(store => store.movies);
    const genres = useSelector(store => store.genres);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
        dispatch({ type: 'FETCH_GENRES' });
    }, []);

    // This will be where we add a MOVIE

    // The is where will we hand the Movie Details Page & Genre Details Clicks
    const handleClick =(movie) => {
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: movie})
        history.push(`/movie-details/${movie.id}`);
    };

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                           <div className="posterTitle" key={movie.id}>
                                <h3 className="movieTitles" onClick={() => handleClick(movie)}>{movie.title}</h3>
                                <img className="moviePosters" onClick={() => handleClick(movie)} src={movie.poster} alt={movie} />
                           </div>
                    
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;