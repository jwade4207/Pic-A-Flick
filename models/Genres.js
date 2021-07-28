const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Genres extends Model {}

Genres.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
      genre_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'genres',
  }
);

module.exports = Genres;