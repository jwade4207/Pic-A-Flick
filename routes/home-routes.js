const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movies, User } = require('../models');

// render the home page
router.get('/', (req, res) => {
    Movies.findAll({
        attributes: [
            'id',
            'title',
            'genre_name',
            'user_id'
          ],
        // order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username'],
                // loggedIn: req.session.loggedIn = true
            }
        ]
    })
        // render the movies
        .then(dbMoviesData => {
            const movies = dbMoviesData.map(movies => movies.get({ plain: true }));
            // pass the movies into the homepage template
            res.render('homepage', {
              movies,
              loggedIn: req.session.loggedIn
            });
          })
          .catch(err => {
              console.log(err);
              res.status(500).json(err);
          });
});

  // render comedy page
router.get('/comedy', (req, res) => {
  Movies.findAll({
      attributes: [
          'id',
          'title',
          'genre_name',
          'user_id'
        ],
      // order: [[ 'created_at', 'DESC']],
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
      // render the movies
      .then(dbMoviesData => {
          const movies = dbMoviesData.map(movies => movies.get({ plain: true }));
          // pass the movies into the homepage template
          res.render('comedy')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

  // render guiltyPleasures page
  router.get('/guiltyPleasures', (req, res) => {
    Movies.findAll({
        attributes: [
            'id',
            'title',
            'genre_name',
            'user_id'
          ],
        // order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        // render the movies
        .then(dbMoviesData => {
            const movies = dbMoviesData.map(movies => movies.get({ plain: true }));
            // pass the movies into the homepage template
            res.render('guiltyPleasures')
          })
          .catch(err => {
              console.log(err);
              res.status(500).json(err);
          });
  });

    // render horror page
router.get('/horror', (req, res) => {
  Movies.findAll({
      attributes: [
          'id',
          'title',
          'genre_name',
          'user_id'
        ],
      // order: [[ 'created_at', 'DESC']],
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
      // render the movies
      .then(dbMoviesData => {
          const movies = dbMoviesData.map(movies => movies.get({ plain: true }));
          // pass the movies into the homepage template
          res.render('horror')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

  // render sciFi page
  router.get('/sciFi', (req, res) => {
    Movies.findAll({
        attributes: [
            'id',
            'title',
            'genre_name',
            'user_id'
          ],
        // order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        // render the movies
        .then(dbMoviesData => {
            const movies = dbMoviesData.map(movies => movies.get({ plain: true }));
            // pass the movies into the homepage template
            res.render('sciFi')
          })
          .catch(err => {
              console.log(err);
              res.status(500).json(err);
          });
  });

    // render superHero page
router.get('/superHero', (req, res) => {
  Movies.findAll({
      attributes: [
          'id',
          'title',
          'genre_name',
          'user_id'
        ],
      // order: [[ 'created_at', 'DESC']],
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ]
  })
      // render the movies
      .then(dbMoviesData => {
          const movies = dbMoviesData.map(movies => movies.get({ plain: true }));
          // pass the movies into the homepage template
          res.render('superHero')
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

  // render the single movie page
router.get('/movie/:id', (req, res) => {
  Movies.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'genre_name',
      'user_id',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
    ]
  })
    .then(dbMoviesData => {
      if (!dbMoviesData) {
        res.status(404).json({ message: 'No movie found with this id' });
        return;
      }
      // serialize the movie data, removing extra sequelize meta data
      const movie = dbMovieData.get({ plain: true });
      // pass the movies and a session variable into the single movie template
      res.render('single-movie', {
          movie,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

  // render the login page, redirect to homepage if user is logged in
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
      
        res.render('login');
      });

  // render the sign up page
  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });

  // render dashboard page
  // router.get('/views/dashboard', (req, res) => {
  //   if (!req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  
  //   res.render('/views/dashboard');
  // });

    module.exports = router;
