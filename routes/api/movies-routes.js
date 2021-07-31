const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Movies, User, Vote } = require('../../models');
const withAuth = require('../../utils/auth');

// get all movies
router.get('/', (req, res) => {
    Movies.findAll({
        attributes: [
            'id', 
            'title', 
            'genre_name',
            'user_id',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.movie_id)'), 'vote_count']
        ],
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]    
    })
    .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET api/movies/:id -- get a single movies by id
router.get('/:id', (req, res) => {
  Movies.findOne({
    where: {
      // specify the movies id parameter in the query
      id: req.params.id
    },
    attributes: [
      'id', 
      'title', 
      'genre_name',
      'user_id',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.movie_id)'), 'vote_count']
  ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbMoviesData => {
      // if no movie by that id exists, return an error
      if (!dbMoviesData) {
        res.status(404).json({ message: 'No movie found with this id' });
        return;
      }
      res.json(dbMoviesData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a movie **ADD withAuth
router.post('/', withAuth, (req, res) => {
    Movies.create({
        title: req.body.title,
        genre_name: req.body.genre_name
    })
        .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/movies/vote
router.put('/vote', (req, res) => {
  // create vote
  Vote.create({
    user_id: req.body.user_id,
    movie_id: req.body.movie_id
  })
  .then(() => {
    // then find movie voted on
    return Movie.findOne({
      where: {
        id: req.body.movie_id
      },
      attributes: [
        'id',
        'movie_url',
        'title',
        'created_at'
        [
          sequelize.literal('(SELECT COUNT(*) FROM vote WHERE movie.id = vote.post_id)'),
          'vote_count'
        ]
      ]
    })
    .then(dbMoviesData => res.json(dbMoviesData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  })
});

// delete a movie **ADD withAuth
router.delete('/:id', withAuth, (req, res) => {
    Movies.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbMoviesData => {
        if (!dbMoviesData) {
          res.status(404).json({ message: 'No movie found with this id' });
          return;
        }
        res.json(dbMoviesData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;