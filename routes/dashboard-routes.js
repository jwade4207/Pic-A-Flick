const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movies, User } = require('../models');
const withAuth = require('../utils/auth');

// route to render the dashboard page, only for a logged in user
router.get('/', withAuth, (req, res) => {
    Movies.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'genre_name',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbMoviesData => {
        // serialize data before passing to template
        const movies = dbMoviesData.map(movie => movie.get({ plain: true }));
        res.render('dashboard', { movies, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// route to edit a movie
// router.get('/edit/:id', withAuth, (req, res) => {
//   Movies.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'title',
//       'genre_name',
//       'created_at',
//     ],
//     include: [
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbMoviesData => {
//       // if no movie by that id exists, return an error
//       if (!dbMoviesData) {
//         res.status(404).json({ message: 'No movie found with this id' });
//         return;
//       }
//       // serialize data before passing to template
//       const movie = dbMoviesData.get({ plain: true });
//       res.render('edit-movie', { movie, loggedIn: true });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;