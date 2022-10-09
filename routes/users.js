const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const {
  editUser,
  getCurrentUserInfo,
} = require('../controllers/users');

router.get('/me', getCurrentUserInfo);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Поле email заполнено некорректно');
    }),
  }),
}), editUser);

module.exports = router;
