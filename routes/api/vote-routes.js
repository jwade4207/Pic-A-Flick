const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User, Vote, Movies } = require('../../models');

//get all users
router.get('/', (req, res) => {
    //console.log('============');
    Vote.findAll({
        //query configuration
        attributes: [
            'id',
            
            // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE genres.id = vote.user_id)'), 'vote_count']
        ],
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
    .then(dbVoteData => res.json(dbVoteData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});
//route that allows us to create a vote
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

//Post vote route
router.post('/vote', ({ body }, res) => {
    // Data validation
    const errors = inputCheck(body, 'user_id', 'movie_id');
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO votes (user_id, movie_id) VALUES (?,?)`;
    const params = [body.user_id, body.movie_id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body,
        changes: result.affectedRows
      });
    });
  });

//PUT /api/genre/upvote
router.put('/vote', (req, res) => {
    // custom static method created in models/Genre.js
    Vote.upvote(req.body, { Vote, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//allows you to update a votte
router.put('/:id', (req, res) => {
    Vote.update(
        {
            user_id: req.body.user_id,
            genre_id: req.body.genre_id
        },
        {
            where: {
                id: req.params.id
            }
        })
        .then(dbVoteData => {
            if (!dbVoteData) {
                res.status(404).json({ message: 'No vote found with this id' });
                return;
            }
            res.json(dbVoteData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//route to delete a vote
router.delete('/:id', (req, res) => {
    Vote.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbVoteData => {
            if (!dbVoteData) {
                res.status(404).json({ message: 'No vote found with this id' });
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