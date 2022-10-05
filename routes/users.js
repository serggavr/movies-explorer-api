const router = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');

const {
  editUser,
  getCurrentUserInfo,
} = require('../controllers/users');

router.get('/me', getCurrentUserInfo);

router.patch('/me', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editUser);

module.exports = router;
