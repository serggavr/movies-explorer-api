/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { UnauthorizedError, ServerError } = require('../constants/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'обязательно для заполнения'],
    minlength: [2, 'должно содержать минимум 2 символа'],
    maxlength: [30, 'должно содержать максимум 30 символов'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'обязательно для заполнения'],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Не верный формат email');
      }
    },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'обязательно для заполнения'],
  },
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  return {
    _id: user._id, name: user.name, email: user.email,
  };
};

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }

          return user;
        });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        return Promise.reject(new UnauthorizedError(err.message));
      }
      return Promise.reject(new ServerError('Произошла ошибка'));
    });
};

module.exports = mongoose.model('user', userSchema);
