const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Vote, Genres } = require('../../models');

//get all users
router.get('/', (req, res) => {
    //console.log('============');
    Vote.findAll({
        //query configuration
        attributes: [
            'id',
            
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE genres.id = vote.genre_id)'), 'vote_count']
        ],
        order: [['created_at', 'DESC']],
        include: [
            // {
            //     model: Comment,
            //     attributes: ['id', 'genre_id', 'user_id', ],
            //     include: {
            //         model: User,
            //         attributes: ['username']
            //     }
            // },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
});
//route that allows us to create a genre
router.get('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
   Vote.create({
        title: req.body.title,
        user_id: req.body.user_id
    })
        .then(dbVoteData => res.json(dbVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//PUT /api/genre/upvote
router.put('/upvote', (req, res) => {
    // custom static method created in models/Genre.js
    Vote.upvote(req.body, { Vote, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//allows you to update a post's title
router.put('/:id', (req, res) => {
    Vote.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbVoteData => {
            if (!dbVoteData) {
                res.status(404).json({ message: 'No genre found with this id' });
                return;
            }
            res.json(dbVoteData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route to delete a genre
router.delete('/:id', (req, res) => {
    Vote.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbVoteData => {
            if (!dbVoteData) {
                res.status(404).json({ message: 'No genre found with this id' });
                return;
            }
            res.json(dbVoteData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;