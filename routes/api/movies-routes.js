const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Movies, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all movies
router.get('/', (req, res) => {
    Movies.findAll({
        attributes: [
            'id', 
            'title', 
            'genre_name',
            'user_id',
            'created_at'
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
      'created_at'
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

// create a movie
router.post('/', withAuth, (req, res) => {
    Movies.create({
        title: req.body.title,
        genre_name: req.body.genre_name,
        user_id: req.session.user_id
      })
        .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a movie
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