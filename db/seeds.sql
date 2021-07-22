const { Genres } = require('../models');

const GenresData = [
  {
    Genre_name: 'Comedies',
  },
  {
    Genre_name: 'Syfi',
  },
  {
    Genre_name: 'Horror Films',
  },
  {
    Genre_name: 'Super Hero',
  },
  {
    Genre_name: 'Gulity Pleasure',
  },
];

const seedGenres = () => Category.bulkCreate(GenresData);

module.exports = seedGenres;