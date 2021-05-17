const { BAD_REQUEST } = require('http-status');

const { ruleBodySchema } = require('../models/data.model');

const Validator = {
  async ValidateRuleBody(req, res, next) {
    const schema = ruleBodySchema;
    const { error } = schema.validate(req.body);

    if (!error) {
      return next();
    }
    //prettier-ignore
    const errorMessage = error.message.replace(/\"/g,"");

    return res.status(BAD_REQUEST).json({
      message: `${errorMessage}.`,
      status: 'error',
      data: null,
    });
  },
};

module.exports = Validator;
