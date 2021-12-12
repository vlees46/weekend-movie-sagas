import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import MovieDetail from '../MovieList/MovieDetails';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route exact path='/movie-details/:id'>
          <MovieDetail />
        </Route>
        

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
