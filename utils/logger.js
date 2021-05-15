const winston = require('winston');
const { NODE_ENV } = require('../config/env');

const { combine, splat, timestamp, printf, colorize, prettyPrint } =
  winston.format;

const customFormat = printf(({ level, message, timestamp }) => {
  let msg = `${timestamp} [${level}] : ${message} `;
  return msg;
});

const logger = winston.createLogger({
  level: NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    colorize(),
    splat(),
    timestamp(),
    prettyPrint(),
    customFormat
  ),
  defaultMeta: { service: 'rule-validator-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log', level: 'info' }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;
