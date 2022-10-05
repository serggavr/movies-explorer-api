const Movie = require('../models/movie');
const {
  ServerError,
  NotFoundError,
  CastError,
  ForbiddenError,
} = require('../constants/errors');

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner = req.user._id,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CastError(`Переданы некорректные данные при добавлении фильма. Поле${err.message.replace('movie validation failed:', '').replace(':', '')}`));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      res.send(movie);
    })
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findOne({ movieId: req.params.movieId })
    // eslint-disable-next-line consistent-return
    .then((movie) => {
      if (movie) {
        if (movie.owner.toString() === req.user._id.toString()) {
          Movie.findByIdAndRemove(movie._id)
            .then(() => res.send({ message: 'Фильм удален' }))
            .catch(() => next(new ServerError('Произошла ошибка')));
        } else {
          return next(new ForbiddenError('Доступ запрещен'));
        }
      } else {
        return next(new NotFoundError(`Фильм c id: ${req.params.cardId} не найдена`));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new CastError('Переданы некорректные данные при удалении фильма'));
      }
      return next(new ServerError('Произошла ошибка'));
    });
};
