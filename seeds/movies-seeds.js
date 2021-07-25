const { Movies } = require('../models');

const moviesData = [
  {
    title: 'O Brother, Where Art Thou?',
    genre_name: 'Comedies'
  },
  {
    title: 'Coming to America',
    genre_name: 'Comedies'
  },
  {
    title: 'Anchorman',
    genre_name: 'Comedies'
  },
  {
    title: 'Scary Movie',
    genre_name: 'Comedies'
  },
  {
    title: 'Im Gonna Git You Sucka',
    genre_name: 'Comedies'
  },
  {
    title: 'Star Wars - The Empire Strikes Back',
    genre_name: 'Sci-fi'
  },
  {
    title: 'Alien',
    genre_name: 'Sci-fi'
  },
  {
    title: 'Predator',
    genre_name: 'Sci-fi'
  },
  {
    title: 'Men in Black',
    genre_name: 'Sci-fi'
  },
  {
    title: 'ET',
    genre_name: 'Sci-fi'
  },
  {
    title: 'Dark Knight',
    genre_name: 'Super Hero'
  },
  {
    title: 'Iron Man',
    genre_name: 'Super Hero'
  },
   {
    title: 'Black Panther',
    genre_name: 'Super Hero'
  },
  {
    title: 'Superman',
    genre_name: 'Super Hero'
  },
  {
    title: 'Spider-Man: Into the Spider-Verse',
    genre_name: 'Super Hero'
  },
  {
    title: 'The Cabin in the Woods',
    genre_name: 'Horror Films'
  },
  {
    title: 'A Nightmare on Elm Street',
    genre_name: 'Horror Films'
  },
  {
    title: 'Friday the 13th',
    genre_name: 'Horror Films'
  },
  {
    title: 'The Conjuring',
    genre_name: 'Horror Films'
  },
  {
    title: 'Pet Sematary',
    genre_name: 'Horror Films'
  },
  {
    title: 'Titanic',
    genre_name: 'Guilty Pleasure'
  },
   {
    title: 'A Walk to Remember',
    genre_name: 'Guilty Pleasure'
  },
   {
    title: 'Step Up 2: The Streets',
    genre_name: 'Guilty Pleasure'
  },
   {
    title: 'Shes All That',
    genre_name: 'Guilty Pleasure'
  },
  {
    title: 'EuroTrip',
    genre_name: 'Guilty Pleasure'
  }
];

const seedMovies = () => Movies.bulkCreate(moviesData);

module.exports = seedMovies;