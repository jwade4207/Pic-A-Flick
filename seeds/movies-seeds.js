const { Movies } = require('../models');

const moviesData = [
  {
    title: 'Anchorman',
    genre_name: 'Comedies',
    user_id: 2
  },
  {
    title: 'Coming to America',
    genre_name: 'Comedies',
    user_id: 8
  },
  {
    title: 'Im Gonna Git You Sucka',
    genre_name: 'Comedies',
    user_id: 4
  },
  {
    title: 'O Brother, Where Art Thou?',
    genre_name: 'Comedies',
    user_id: 3
  },
  {
    title: 'Scary Movie',
    genre_name: 'Comedies',
    user_id: 1
  },
  {
    title: 'Alien',
    genre_name: 'Sci-fi',
    user_id: 2
  },
  {
    title: 'ET',
    genre_name: 'Sci-fi',
    user_id: 5
  },
  {
    title: 'Men in Black',
    genre_name: 'Sci-fi',
    user_id: 6
  },
  {
    title: 'Predator',
    genre_name: 'Sci-fi',
    user_id: 3
  },
  {
    title: 'Star Wars - The Empire Strikes Back',
    genre_name: 'Sci-fi',
    user_id: 1
  },
  {
    title: 'Black Panther',
    genre_name: 'Super Hero',
    user_id: 2
  },
  {
    title: 'Dark Knight',
    genre_name: 'Super Hero',
    user_id: 7
  },
  {
    title: 'Iron Man',
    genre_name: 'Super Hero',
    user_id: 6
  },
  {
    title: 'Spider-Man: Into the Spider-Verse',
    genre_name: 'Super Hero',
    user_id: 5
  },
  {
    title: 'Superman',
    genre_name: 'Super Hero',
    user_id: 5
  },
  {
    title: 'The Cabin in the Woods',
    genre_name: 'Horror Films',
    user_id: 4
  },
  {
    title: 'The Conjuring',
    genre_name: 'Horror Films',
    user_id: 3
  },
  {
    title: 'Friday the 13th',
    genre_name: 'Horror Films',
    user_id: 8
  },
  {
    title: 'A Nightmare on Elm Street',
    genre_name: 'Horror Films',
    user_id: 1
  },
  {
    title: 'Pet Sematary',
    genre_name: 'Horror Films',
    user_id: 5
  },
  {
    title: 'EuroTrip',
    genre_name: 'Guilty Pleasure',
    user_id: 8
  },
  {
    title: 'Shes All That',
    genre_name: 'Guilty Pleasure',
    user_id: 4
  },
  {
    title: 'Step Up 2: The Streets',
    genre_name: 'Guilty Pleasure',
    user_id: 6
  },
  {
    title: 'Titanic',
    genre_name: 'Guilty Pleasure',
    user_id: 2
  },
  {
    title: 'A Walk to Remember',
    genre_name: 'Guilty Pleasure',
    user_id: 1
  },
];

const seedMovies = () => Movies.bulkCreate(moviesData);

module.exports = seedMovies;