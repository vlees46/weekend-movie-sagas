const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// get genres (by name) that match with movie (by id)
router.get('/selected-movie-genre/:id', (req,res) => { 
  const queryText = `SELECT "genres"."name" FROM "genres"
  JOIN "movies_genres" ON "movies_genres"."genre_id" = "genres"."id"
  JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
  WHERE "movies"."id" = $1
  GROUP BY "genres"."name";`;
  pool.query(queryText, [req.params.id])
  .then((result) => {res.send(result.rows); })
  .catch((error) => {
    console.log('error on server side SELECTED MOVIE GENRE details', error)
    res.sendStatus(500);
  });
}); 

// get ALL genres 
router.get('/', (req, res) => {
  const genresQuery= `SELECT * FROM "genres" ORDER BY "name";`;
  pool.query(genresQuery)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR getting all genres (genre.router.js)', err);
      res.sendStatus(500)
    })
});

module.exports = router;