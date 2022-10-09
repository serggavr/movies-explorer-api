const ServerError = require('./ServerError');
const NotFoundError = require('./NotFoundError');
const CastError = require('./CastError');
const UnauthorizedError = require('./UnauthorizedError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  ServerError,
  NotFoundError,
  CastError,
  UnauthorizedError,
  ConflictError,
  ForbiddenError,
};
