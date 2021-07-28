const { User } = require('../models');

const userData = [
    {
      "username": "harleyquinn",
      "password": "puddin"
    },
    {
      "username": "poisonivy",
      "password": "pamela"
    },
    {
      "username": "blackcanary",
      "password": "dinah"
    },
    {
      "username": "batwoman",
      "password": "kane"
    },
    {
      "username": "huntress",
      "password": "helena"
    },
    {
      "username": "wonderwoman",
      "password": "amazons"
    },
    {
      "username": "supergirl",
      "password": "krypton"
    },
    {
      "username": "catwoman",
      "password": "selina"
    }
  ];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = seedUsers;