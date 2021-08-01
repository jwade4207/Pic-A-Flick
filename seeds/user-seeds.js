const { User } = require('../models');

const userData = [
    {
      "username": "harleyquinn",
      "email": "harleyquinn@dc.com",
      "password": "puddin"
    },
    {
      "username": "poisonivy",
      "email": "poisonivy@dc.com",
      "password": "pamela"
    },
    {
      "username": "blackcanary",
      "email": "blackcanary@dc.com",
      "password": "dinah"
    },
    {
      "username": "batwoman",
      "email": "batwoman@dc.com",
      "password": "kane"
    },
    {
      "username": "huntress",
      "email": "huntress@dc.com",
      "password": "helena"
    },
    {
      "username": "wonderwoman",
      "email": "wonderwoman@dc.com",
      "password": "amazons"
    },
    {
      "username": "supergirl",
      "email": "supergirl@dc.com",
      "password": "krypton"
    },
    {
      "username": "catwoman",
      "email": "catwoman@dc.com",
      "password": "selina"
    }
  ];

const seedUsers = () => User.bulkCreate(userData);

//  WARNING seed bulk create does NOT hash the password, so they must be hashed via the update route before the login route will work!

module.exports = seedUsers;