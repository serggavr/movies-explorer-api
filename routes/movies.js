const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const { linkValidationPattern, idValidationPattern } = require('../constants/validationPattern');
const {
  createMovie,
  getSavedMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.delete('/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().regex(idValidationPattern),
  }),
}), deleteMovie);

router.post('/', celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(linkValidationPattern),
    trailerLink: Joi.string().required().regex(linkValidationPattern),
    thumbnail: Joi.string().required().regex(linkValidationPattern),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

module.exports = router;
