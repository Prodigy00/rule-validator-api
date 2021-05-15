const logger = require('../utils/logger');
const { INTERNAL_SERVER_ERROR } = require('http-status');

function ErrorHandler(error, req, res, next) {
  logger.error(error);
  const status = error.statusCode || INTERNAL_SERVER_ERROR;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message, status: 'error', data });
}

module.exports = ErrorHandler;
