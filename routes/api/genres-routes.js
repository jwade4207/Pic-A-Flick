const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Genres, User, Vote} = require('../../models');

//get all genres
router.get('/', (req, res) => {
    //console.log('============');
    Genres.findAll({
        //query configuration
        attributes: [
            'id',
            
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE genre.id = vote.genre_id)'), 'vote_count']
        ],
        // include: [
        //     // {
        //     //     model: Comment,
        //     //     attributes: ['id', 'genre_id', 'user_id', ],
        //     //     include: {
        //     //         model: User,
        //     //         attributes: ['username']
        //     //     }
        //     // },
        //     {
        //         model: User,
        //         attributes: ['username']
        //     }
        // ]
    })
    .then(dbGenreData => res.json(dbGenreData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//route that allows us to create a genre
router.get('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
   Genres.create({
        title: req.body.title,
        user_id: req.body.user_id
    })
        .then(dbGenreData => res.json(dbGenreData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT /api/genre/upvote
router.put('/upvote', (req, res) => {
    // custom static method created in models/Genre.js
    Genres.upvote(req.body, { Vote, User })
        .then(updatedGenreData => res.json(updatedGenreData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//allows you to update a post's title
router.put('/:id', (req, res) => {
    Genre.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbGenreData => {
            if (!dbGenreData) {
                res.status(404).json({ message: 'No genre found with this id' });
                return;
            }
            res.json(dbGenreData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route to delete a genre
router.delete('/:id', (req, res) => {
    Genre.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbGenreData => {
            if (!dbGenreData) {
                res.status(404).json({ message: 'No genre found with this id' });
                return;
            }
            res.json(dbGenreData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;