const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Movies, User, Vote } = require('../../models');

// get all movies
router.get('/', (req, res) => {
    Movies.findAll({
        attributes: [
            'id', 
            'title', 
            'genre_name'
        ]
        // include: [
        //     // {
        //     //     model: User,
        //     //     attributes: ['username']
        //     // }
        // ]    
    })
    .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// create a movie **ADD withAuth
router.post('/', (req, res) => {
    Movies.create({
        title: req.body.title,
        genre_name: req.body.genre_name
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete a movie **ADD withAuth
router.delete('/:id', (req, res) => {
    Movies.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


module.exports = router;