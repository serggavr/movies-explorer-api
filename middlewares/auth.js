const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../constants/errors');

const { NODE_ENV, JWT_SECRET, DEV_SECRET = 'DEV_SECRET' } = process.env;

module.exports.auth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
    } catch (err) {
      next(new UnauthorizedError('Ошибка авторизации'));
    }

    req.user = payload;

    next();
  } else {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
};
