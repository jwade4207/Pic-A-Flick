const User = require('./User');
const Movies = require('./Movies');
// const Comment = require('./Comment');

// create associations
User.hasMany(Movies, {
    foreignKey: 'user_id'
});

Movies.belongsTo(User, {
    foreignKey: 'user_id'
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

module.exports = { User, Movies };