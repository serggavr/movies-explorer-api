const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  login,
  createUser,
  signout,
} = require('../controllers/users');

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), createUser);

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
}), login);

router.post('/signout', signout);

module.exports = router;
