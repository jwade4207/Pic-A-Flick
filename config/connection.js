// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

// create a connection to our database, pass in your mysql info for username and password
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001,
    user: 'root',
    password: 'MonkeyBoy8!'
  });
}
  
  module.exports = sequelize;