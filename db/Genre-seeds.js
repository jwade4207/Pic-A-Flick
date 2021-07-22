const { Genres } = require('../models');

const GenresData = [
  {
    Genre_name: 'Comedies',
    Title: 'Obrother were art thou', 
    category_id: 1,
    },
   {
    Genre_name: 'Comedies',
    Title: 'Coming to America', 
    category_id: 2,
   },
   {
    Genre_name: 'Comedies',
    Title: 'Anchor Man' , 
    category_id: 3,
   },
    {
    Genre_name: 'Comedies',
    Title: 'Scary Movie' , 
    category_id: 4,
    },
    {
    Genre_name: 'Comedies',
    Title: 'Im going to get you sucka' , 
    category_id: 5,
    },
  {
    Genre_name: 'Syfi',
    Title: 'Star Wars' ,
    category_id: 6,
  },
   {
    Genre_name: 'Syfi',
    Title: 'Alien'  ,
    category_id: 7,
  },
   {
    Genre_name: 'Syfi',
    Title: 'Predator' ,
    category_id: 8,
  },
   {
    Genre_name: 'Syfi',
    Title: 'Men in Black' ,
    category_id: 9,
  },
   {
    Genre_name: 'Syfi',
    Title: 'ET' ,
    category_id: 10,
  },
  {
    Genre_name: 'Super Hero',
    Title: 'Dark Knight' ,
    category_id: 11,
  },
   {
    Genre_name: 'Super Hero',
    Title: 'Iron Man' ,
    category_id: 12,
  },
   {
    Genre_name: 'Super Hero',
    Title: 'Black Pather' ,
    category_id: 13,
  },
   {
    Genre_name: 'Super Hero',
    Title: 'Superman',
    category_id: 14,
  },
   {
    Genre_name: 'Super Hero',
    Title: 'Spider-man into the spiderverse' ,
    category_id: 15,
  },
  {
    Genre_name: 'Horror Films',
    Title: 'Cabin in the woods' ,
    category_id: 16,
  },
  {
    Genre_name: 'Horror Films',
    Title:'Nightmare on Elm Street' ,
    category_id: 17,
  },
  {
    Genre_name: 'Horror Films',
    Title: 'Friday the 13th' ,
    category_id: 18,
  },
  {
    Genre_name: 'Horror Films',
    Title: 'The Conjuring' ,
    category_id: 19,
  },
  {
    Genre_name: 'Horror Films',
    Title: 'Pet Sematary' ,
    category_id: 20,
  },
  {
    Genre_name: 'Gulity Pleasure',
    Title: 'Titanic' ,
    category_id: 21,
  },
   {
    Genre_name: 'Gulity Pleasure',
    Title: 'A walk to remember' ,
    category_id: 22,
  },
   {
    Genre_name: 'Gulity Pleasure',
    Title: 'Step Up 2 Tha Streets' ,
    category_id: 23,
  },
   {
    Genre_name: 'Gulity Pleasure',
    Title: 'Shes All That' ,
    category_id: 24,
  },
   {
    Genre_name: 'Gulity Pleasure',
    Title: 'Euro Trip' ,
    category_id: 25,
  },

];

const seedGenres = () => Genres.bulkCreate(GenresData);

module.exports = seedGenres;