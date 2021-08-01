const router = require('express').Router();
const { User, Movies, Vote } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// GET /api/users
router.get('/', (req, res) => {
    //access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Movies,
                attributes: ['id', 'title', 'genre_name', 'user_id']
            },
            {
              model: Movies,
              attributes: ['title'],
              through: Vote,
              as: 'voted_movies'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users creates new user
router.post('/', (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      // send the user data back to the client as confirmation and save the session
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
      
          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/users/login -- login route for a user
router.post('/login',  (req, res) => {
  User.findOne({
      where: {
      email: req.body.email
      }
  }).then(dbUserData => {
      // if the email is not found, return an error
      if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email!' });
      return;
      }
      // otherwise, verify the user.
      // call the instance method as defined in the User model
      const validPassword = dbUserData.checkPassword(req.body.password);
      // if the password is invalid (method returns false), return an error
      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect password!' });
          return;
      }
      // otherwise, save the session, and return the user object and a success message
      req.session.save(() => {
        // declare session variables
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' });
      });
  });  
});

// POST /api/users/logout -- log out an existing user
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        // 204 status is that a request has succeeded, but client does not need to go to a different page
        res.status(204).end();
      });
    } else {
      // if there is no session, then the logout request will send back a no resource found status
      res.status(404).end();
    }
  })

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {

    // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;