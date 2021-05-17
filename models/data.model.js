const Joi = require('joi');

const isNumber = require('../utils/isNumber');
const nestedObjCheck = require('../utils/checkNestedObj');
const isArray = require('../utils/isArray');

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

const conditionPicker = {
  eq: isEqual,
  neq: isNotEqual,
  gt: isGreaterThan,
  gte: isGreaterThanOrEqual,
  contains: contains,
};

function findCondition(condition) {
  return Object.entries(conditionPicker).find((c) => condition === c[0]);
}

function isEqual(fieldValue, conditionValue) {
  return fieldValue === conditionValue;
}

function isNotEqual(fieldValue, conditionValue) {
  return fieldValue !== conditionValue;
}

function isGreaterThan(fieldValue, conditionValue) {
  return fieldValue > conditionValue;
}

function isGreaterThanOrEqual(fieldValue, conditionValue) {
  return fieldValue >= conditionValue;
}

function contains(fieldValue, conditionValue) {
  if (!isArray(conditionValue)) {
    return String(conditionValue).includes(fieldValue);
  }
  return [...conditionValue].includes(fieldValue);
}

function fieldCheckForDataAsObject(field, dataObj) {
  const nestedLevel = nestedObjCheck(field);

  if (nestedLevel.isBeyondTwoLevels) {
    const error = new Error('nested objects beyond two levels are not allowed');
    error.statusCode = 400;
    error.data = null;
    throw error;
  }

  if (nestedLevel.level === 3) {
    const fieldsArr = field.split('.');

    const fieldValue = dataObj[fieldsArr[0]][fieldsArr[1]][fieldsArr[2]];

    if (!fieldValue) {
      const missingField = fieldsArr[fieldsArr.length - 1];
      const error = new Error(`field ${missingField} is missing from data.`);
      error.statusCode = 400;
      error.data = null;
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
      error.data = null;
      throw error;
    }
    return fieldValue;
  }

  return dataObj[field];
}

function fieldCheckForDataAsArray(field, dataArr) {
  console.log({ field, dataArr });
  const fieldValue = dataArr[field];
  if (!fieldValue) {
    const error = new Error(`field ${field} is missing from data.`);
    error.statusCode = 400;
    error.data = null;
    throw error;
  }
  return fieldValue;
}

function fieldCheckForDataAsString(field, dataString) {
  const fieldIsNum = isNumber(+field);
  if (!fieldIsNum) {
    const fieldValueExists = String(dataString).includes(field);
    if (!fieldValueExists) {
      const error = new Error(`field ${field} is missing from data.`);
      error.statusCode = 400;
      error.data = null;
      throw error;
    }
    return field;
  }

  const fieldValue = String(dataString).charAt(+field);

  if (!fieldValue) {
    const error = new Error(`field ${field} is missing from data.`);
    error.statusCode = 400;
    error.data = null;
    throw error;
  }
  return fieldValue;
}

module.exports = {
  ruleBodySchema,
  findCondition,
  isEqual,
  isNotEqual,
  isGreaterThan,
  isGreaterThanOrEqual,
  contains,
  fieldCheckForDataAsObject,
  fieldCheckForDataAsArray,
  fieldCheckForDataAsString,
};
