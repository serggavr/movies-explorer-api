const mongoose = require('mongoose');
const { linkValidationPattern } = require('../constants/validationPattern');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  director: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  duration: {
    type: Number,
    require: [true, 'обязательно для заполнения'],
  },
  year: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  description: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  image: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  trailerLink: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  thumbnail: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
  nameEN: {
    type: String,
    require: [true, 'обязательно для заполнения'],
  },
});

const urlValidator = function (value) {
  return linkValidationPattern.test(value);
};

movieSchema.path('image').validate(urlValidator, 'error');
movieSchema.path('trailerLink').validate(urlValidator, 'error');
movieSchema.path('thumbnail').validate(urlValidator, 'error');

module.exports = mongoose.model('movie', movieSchema);
