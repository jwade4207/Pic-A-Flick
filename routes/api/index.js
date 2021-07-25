const router = require('express').Router();

const userRoutes = require('./user-routes');
// const genresRoutes = require('./genres-routes');
const moviesRoutes = require('./movies-routes');
const voteRoutes = require('./vote-routes');

router.use('/users', userRoutes);
// router.use('/genres', genresRoutes);
router.use('/movies', moviesRoutes);
router.use('/votes', voteRoutes);

module.exports = router;