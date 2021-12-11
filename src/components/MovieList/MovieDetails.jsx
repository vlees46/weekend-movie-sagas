import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch  } from 'react-redux';
import { useEffect } from 'react'; 

function (MovieDetail){

    const history = useHistory;
    const dispatch = useDispatch;

    const movieItemDetails = useSelector(store => store.selectedMovie)

}
