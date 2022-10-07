const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, DEV_SECRET = 'DEV_SECRET' } = process.env;

const {
  ServerError,
  NotFoundError,
  CastError,
  ConflictError,
} = require('../constants/errors');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      User.create({
        name,
        email,
        password: hashedPassword,
      })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CastError(`Переданы некорректные данные при создании пользователя. Поле${err.message.replace('user validation failed:', '').replace(':', '')}`));
          }
          if (err.code === 11000) {
            next(new ConflictError(`Пользователь с email '${err.keyValue.email}' уже зарегистрирован`));
          }
          next(new ServerError('Произошла ошибка'));
        });
    })
    .catch(() => {
      next(new ServerError('Произошла ошибка'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);

      res.cookie('jwt', token, {
        maxAge: 604800000,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ data: user.toJSON() });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.signout = (req, res, next) => {
  try {
    res.clearCookie('jwt').status(200).send({ message: 'SignOut' });
  } catch (err) {
    next(new ServerError('Произошла ошибка'));
  }
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (user) {
        return res.send(user);
      }
      next(new NotFoundError(`Пользователь ${req.user} не найден`));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан некорректный id пользователя'));
      }
      next(new ServerError('Произошла ошибка'));
    });
};

module.exports.editUser = (req, res, next) => {
  const {
    name,
    email,
    owner = req.user._id,
  } = req.body;
  User.findById(owner)
    .then((userFound) => {
      if (!userFound) {
        next(new NotFoundError(`Пользователь c id: ${owner} не найден`));
      }
      // User.find
      return User.findByIdAndUpdate(owner, {
        name,
        email,
      }, { new: true, runValidators: true })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CastError(`Переданы некорректные данные при обновлении профиля. Поле${err.message.replace('Validation failed:', '').replace(':', '')}`));
          }
          if (err.code === 11000) {
            next(new ConflictError(`Пользователь с email '${err.keyValue.email}' уже зарегистрирован`));
          }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Передан некорректный id при обновлении профиля'));
      }
      next(new ServerError('Произошла ошибка'));
    });
};
