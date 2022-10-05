const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../constants/errors');

const { NODE_ENV, JWT_SECRET, DEV_SECRET = 'DEV_SECRET' } = process.env;

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    let payload;

    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
    } catch (err) {
      return next(new UnauthorizedError('Ошибка авторизации'));
    }

    req.user = payload;

    next();
  } else {
    return next(new UnauthorizedError('Ошибка авторизации'));
  }
};
