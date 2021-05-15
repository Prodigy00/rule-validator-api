const Joi = require('joi');

const ruleFieldSchema = Joi.object().keys({
  field: Joi.string().required(),
  condition: Joi.string()
    .valid('eq', 'neq', 'gt', 'gte', 'contains')
    .required(),
  condition_value: Joi.alternatives()
    .try(Joi.number(), Joi.string())
    .required(),
});

const dataFieldSchema = Joi.alternatives()
  .try(Joi.object(), Joi.array(), Joi.string())
  .required();

const ruleBodySchema = Joi.object().keys({
  rule: ruleFieldSchema.required(),
  data: dataFieldSchema.required(),
});

module.exports = ruleBodySchema;
