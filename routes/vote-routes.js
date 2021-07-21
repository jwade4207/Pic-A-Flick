const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Genre, User, Vote } = require('../../models');

//get all users
router.get('/', (req, res) => {
    //console.log('============');
    Post.findAll({
        //query configuration
        attributes: [
            'id',
            
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'genre_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        //promise that catches the response from the above query/database call
        .then(dbGenreData => res.json(dbGenreData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route that lets you GET a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'genre_id', 'user_id', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbGenreData => {
            if (!dbGenreData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbGenreData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route that allows us to create a genre
router.genre('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Genre.create({
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
    // custom static method created in models/Post.js
    Genre.upvote(req.body, { Vote, User })
        .then(updatedGenretData => res.json(updatedGenreData))
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
        }
    )
        .then(dbGenreData => {
            if (!dbGenreData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbGenreData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route to delete a post
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