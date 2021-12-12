import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
    const { id } = useParams();

    console.log('this is the id movie details page', id);
useEffect(() => { 
    dispatch({ type: 'FETCH_MOVIE_DETAILS', payload: { id: id } })
}); 


    return(
        <div className='movieDetails'>
            <h1>Details for {movieItemDetails.title}</h1>
            <img width="300px" src={movieItemDetails.poster} />
            <p className="detailDescription">{movieItemDetails.description}</p>
            <h2>Genres:</h2>
            <ul>
                {genreArray.map((genre) =>
                    <li key={genre.name}>{genre.name}</li>
                )}
            </ul>
            <button onClick={() => prevPage()}>Previous Page</button>
        </div>
    )
}
export default MovieDetail;