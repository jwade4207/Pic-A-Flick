const seedUsers = require('./user-seeds');
// const seedGenres = require('./genres-seeds');
const seedMovies = require('./movies-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedMovies();
  console.log('\n----- MOVIES SEEDED -----\n');

  await seedVotes();
  console.log('\n----- VOTES SEEDED -----\n');

  process.exit(0);
};

seedAll();