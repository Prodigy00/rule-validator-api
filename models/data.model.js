const Joi = require('joi');

const isNumber = require('../utils/isNumber');
const nestedObjCheck = require('../utils/checkNestedObj');

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

function fieldCheckForDataAsObject(field, dataObj) {
  const nestedLevel = nestedObjCheck(field);

  if (nestedLevel.isBeyondTwoLevels) {
    const error = new Error('nested objects beyond two levels are not allowed');
    error.statusCode = 400;
    throw error;
  }

  if (nestedLevel.level === 3) {
    const fieldsArr = field.split('.');

    const fieldValue = dataObj[fieldsArr[0]][fieldsArr[1]][fieldsArr[2]];

    if (!fieldValue) {
      const missingField = fieldsArr[fieldsArr.length - 1];
      const error = new Error(`field ${missingField} is missing from data.`);
      error.statusCode = 400;
      throw error;
    }
    return fieldValue;
  }

  if (nestedLevel.level === 2) {
    const fieldsArr = field.split('.');

    const fieldValue = dataObj[fieldsArr[0]][fieldsArr[1]];

    if (!fieldValue) {
      const missingField = fieldsArr[fieldsArr.length - 1];
      const error = new Error(`field ${missingField} is missing from data.`);
      error.statusCode = 400;
      throw error;
    }
    return fieldValue;
  }

  return dataObj[field];
}

function fieldCheckForDataAsArray(field, dataObj) {
  const fieldValue = dataObj[field];
  if (!fieldValue) {
    const error = new Error(`field ${field} is missing from data.`);
    error.statusCode = 400;
    throw error;
  }
  return fieldValue;
}

function fieldCheckForDataAsString(field, dataString) {
  const fieldIsNum = isNumber(field);

  if (!fieldIsNum) {
    const fieldValueExists = String(dataString).includes(field);
    if (!fieldValueExists) {
      const error = new Error(`field ${field} is missing from data.`);
      error.statusCode = 400;
      throw error;
    }
    return field;
  }

  const fieldValue = String(dataString).charAt(+field);

  if (!fieldValue) {
    const error = new Error(`field ${field} is missing from data.`);
    error.statusCode = 400;
    throw error;
  }
  return fieldValue;
}

module.exports = {
  ruleBodySchema,
  fieldCheckForDataAsObject,
  fieldCheckForDataAsArray,
  fieldCheckForDataAsString,
};
