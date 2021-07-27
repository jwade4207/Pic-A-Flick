const router = require('express').Router();
const sequelize = require('../config/connection');
const { Movies, User } = require('../models');

// render the home page
router.get('/', (req, res) => {
    Movies.findAll({
        attributes: [
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
            // create an array for the posts, using the get method to trim extra sequelize object data out
            const posts = dbMoviesData.map(movies => movies.get({ plain: true }));
            // pass the posts into the homepage template
            res.render('homepage', {
              posts,
              loggedIn: req.session.loggedIn
            });
          })
          .catch(err => {
              console.log(err);
              res.status(500).json(err);
          });
      });

    module.exports = router;