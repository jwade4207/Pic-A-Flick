const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Movies, User, Vote } = require('../../models');

//get all movies
router.get('/', (req, res) => {
    //console.log('============');
    Movies.findAll({
        //query configuration
        attributes: [
            'id', 'title', 'genre_name'
            
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
    .then(dbMoviesData => res.json(dbMoviesData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// //PUT /api/movie/upvote
// router.put('/upvote', (req, res) => {
//     // custom static method created in models/Genre.js
//     Movies.upvote(req.body, { Vote, User })
//         .then(updatedMoviesData => res.json(updatedMoviesData))
//         .catch(err => {
//             console.log(err);
//             res.status(400).json(err);
//         });
// });


module.exports = router;