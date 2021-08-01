const User = require('./User');
const Movies = require('./Movies');
const Vote = require('./Vote');
// const Comment = require('./Comment');

// create associations
User.hasMany(Movies, {
    foreignKey: 'user_id'
});

Movies.belongsTo(User, {
    foreignKey: 'user_id'
});

// creating user/movie association through votes
User.belongsToMany(Movies, {
    through: Vote,
    as: 'voted_movies',
    foreignKey: 'user_id'
});

Movies.belongsToMany(User, {
    through: Vote,
    as: 'voted_movies',
    foreignKey: 'movie_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Movies, {
    foreignKey: 'movie_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Movies.hasMany(Vote, {
    foreignKey: 'movie_id'
});

// User.belongsTo(Movies, {
//     foreignKey: 'user_id'
// });

// Comment.belongsTo(User, {
//     foreignKey: 'user_id'
// });
  
// Comment.belongsTo(Movies, {
//     foreignKey: 'movies_id'
// });
  
// User.hasMany(Comment, {
//     foreignKey: 'user_id'
// });
  
// Post.hasMany(Comment, {
//     foreignKey: 'post_id'
// });

module.exports = { User, Movies, Vote };