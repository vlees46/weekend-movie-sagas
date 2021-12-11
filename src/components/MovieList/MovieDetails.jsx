import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { useEffect } from 'react'; 

function MovieDetail() {

    const history = useHistory();
    const dispatch = useDispatch();

    const movieItemDetails = useSelector(store => store.selectedMovie);
    const genreArray = useSelector(store => store.selectGenreReducer);

    const prevPage= () => {
        history.push('/');
    }
    const { id } useParams();


    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: {id: id}})
    })


    return(
        <div className='movieDetails'>
            <h1>Details for {movieItemDetails}</h1>
            <img 
        </div>
    )
}
