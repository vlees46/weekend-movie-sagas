import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AddMovie() {
    const genresArray = useSelector(store => store.genres) 
    const history = useHistory();
    const dispatch = useDispatch();

    let [newMovie, setNewMovie] = useState({});

    const newMovTitle = (event) => {
        setNewMovie({ ...newMovie, title: event.target.value});
    }

    const newMovDescription = (event) => {
        setNewMovie({ ...newMovie, description: event.target.value});
    }

    const newMovPoster = (event) => {
        setNewMovie({ ...newMovie, poster: event.target.value});
    }

    const newMovGenre = (event) => {
        setNewMovie({ ...newMovie, genre_id: event.target.value});
    }

    const AddNewMovie = (event) => {
        event.preventDefault();
        console.log('click new movie', newMovie)
    }


    const 

}