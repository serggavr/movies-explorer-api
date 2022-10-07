const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const {
  login,
  createUser,
  signout,
} = require('../controllers/users');

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Поле email заполнено некорректно');
    }),
  }),
}), createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Поле email заполнено некорректно');
    }),
  }),
}), login);

router.post('/signout', signout);

module.exports = router;
