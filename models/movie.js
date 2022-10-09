const mongoose = require('mongoose');
const validator = require('validator');

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
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Не верный формат ссылки на постер к фильму');
      }
    },
  },
  trailerLink: {
    type: String,
    require: [true, 'обязательно для заполнения'],
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Не верный формат ссылки на трейлер к фильму');
      }
    },
  },
  thumbnail: {
    type: String,
    require: [true, 'обязательно для заполнения'],
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error('Не верный формат ссылки на миниатюру постера к фильму');
      }
    },
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

module.exports = mongoose.model('movie', movieSchema);
