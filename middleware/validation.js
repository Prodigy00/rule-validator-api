const Joi = require('joi');
const { BAD_REQUEST } = require('http-status');

const ruleBodySchema = require('../models/data.model');

const Validator = {
  async ValidateRuleBody(req, res, next) {
    const schema = ruleBodySchema;
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (!error) {
      return next();
    }
    return res.status(BAD_REQUEST).json({
      message: error.message,
      status: 'error',
      data: null,
    });
  },
};

module.exports = Validator;
