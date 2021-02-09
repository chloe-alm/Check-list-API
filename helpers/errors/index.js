// ' = '
const BadRequestError = require('./badRequesteError');
const ConflictError = require('./conflictError');
const UnAuthorizedError = require('./unauthorizedError');
const ServerError = require('./serverError');
const NotFoundError = require('./notFoundError');

module.exports = {
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnAuthorizedError,
 ServerError,
};