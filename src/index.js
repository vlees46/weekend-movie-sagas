import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('FETCH_MOVIE_DETAILS', fetchMovieDetails);
    yield takeEvery('FETCH_GENRE_DETAILS', fetchGenreDetails);
    yield takeEvery('FETCH_GENRES', fetchAllGenres);
    yield takeEvery('ADD_MOVIE', addMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie/');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
        
}
// SAGA for Movie Details
function* fetchMovieDetails(action){
    try{
        const selectMovie = action.payload;
        const movieDetails = yield axios.get(`/api/movie/movie-details/${selectMovie.id}`);
        yield put({
             type: 'SET_MOVIE_DETAILS',
             payload: movieDetails.data 
            })
    } catch (error) {
        console.log('error in fetchMovieDetails:', error)
    };
}
// SAGA - details for selected movie GENRE
function* fetchGenreDetails(action) {
    try {
        console.log('fetch SELECTED movie genres in index.js', action)
        const selectMovie = action.payload;
        const selectedMovieGenre = yield axios.get(`/api/genre/selected-movie-genre/${selectMovie.id}`);
        yield put({ type: 'SET_MOVIE_GENRE', payload: selectedMovieGenre.data })
        console.log('index.js selectedMovieGenre.data:', selectedMovieGenre.data);
    } catch (error) {
        console.log('error in fetchMovieDetails:', error)
    }
}

function* fetchAllGenres() {
    try {
        const genres = yield axios.get('/api/genre/');
        yield put({ type: 'SET_GENRES', payload: genres.data });
    } catch (error) {
        console.error('get all error:', error);
    }
}

// SAGA - add movie
function* addMovie(action) {
    try {
        console.log('adding action.payload - index.js:', action.payload);
        yield axios({
            method: 'POST',
            url: '/api/movie/',
            data: action.payload
        });
        yield put({ type: 'FETCH_MOVIES' })
    } catch (error) {
        console.log('error in sending new flick, index.js:', error)
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// REDUCER - Selected MOVIE details
const selectedMovie = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
// REDUCER - Select MOVIE Genre
const selectGenreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIE_GENRE':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the  ALL movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// REDUCER - Used to store all Genre Reducer
const allGenreReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRE':
            return action.payload;
        default:
            return state;
    }
}





// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        selectedMovie,
        selectGenreReducer

    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
