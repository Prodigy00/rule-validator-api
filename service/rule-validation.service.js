const {
  fieldCheckForDataAsArray,
  fieldCheckForDataAsObject,
  findCondition,
  fieldCheckForDataAsString,
} = require('../models/data.model');
const isArray = require('../utils/isArray');
const isNumber = require('../utils/isNumber');
const { isNestedObjectKey, isObject } = require('../utils/isObject');
const isString = require('../utils/isString');

function evaluate({ field, condition, condition_value, data }) {
  const fieldIsNum = isNumber(+field);
  const fieldIsNestedObjKey = isNestedObjectKey(field);
  const fieldIsString = isString(field);

  const dataIsObj = isObject(data);
  const dataIsArray = isArray(data);
  const dataIsString = isString(data);

  if (fieldIsNum && dataIsArray) {
    return validateDataAsArray(field, data, condition, condition_value);
  }

  if (
    (fieldIsNestedObjKey && dataIsObj) ||
    (!fieldIsNestedObjKey && dataIsObj)
  ) {
    return validateDataAsObject(field, data, condition, condition_value);
  }

  if (fieldIsString && dataIsString) {
    return validateDataAsString(field, data, condition, condition_value);
  }

  const error = new Error('Invalid JSON payload passed.');
  error.statusCode = 400;
  error.data = null;
  throw error;
}

function validateDataAsArray(field, data, condition, condition_value) {
  let fieldValue = fieldCheckForDataAsArray(+field, data);

  const operation = findCondition(condition);

  const conditionFnc = operation[1];
  const result = conditionFnc(fieldValue, condition_value);

  if (result === false) {
    return {
      message: `field ${field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field,
          field_value: fieldValue,
          condition: operation[0],
          condition_value,
        },
      },
    };
  }

  return {
    message: `field ${field} successfully validated.`,
    status: 'success',
    data: {
      validation: {
        error: false,
        field,
        field_value: fieldValue,
        condition,
        condition_value,
      },
    },
  };
}

function validateDataAsObject(field, data, condition, condition_value) {
  let fieldValue = fieldCheckForDataAsObject(field, data);
  const operation = findCondition(condition);
  const conditionFnc = operation[1];
  const result = conditionFnc(fieldValue, condition_value);
  if (result === false) {
    return {
      message: `field ${field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field,
          field_value: fieldValue,
          condition: operation[0],
          condition_value,
        },
      },
    };
  }

  return {
    message: `field ${field} successfully validated.`,
    status: 'success',
    data: {
      validation: {
        error: false,
        field,
        field_value: fieldValue,
        condition,
        condition_value,
      },
    },
  };
}

function validateDataAsString(field, data, condition, condition_value) {
  let fieldValue = fieldCheckForDataAsString(field, data);
  const operation = findCondition(condition);
  const conditionFnc = operation[1];
  const result = conditionFnc(fieldValue, condition_value);
  if (result === false) {
    return {
      message: `field ${field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field,
          field_value: fieldValue,
          condition: operation[0],
          condition_value,
        },
      },
    };
  }

  return {
    message: `field ${field} successfully validated.`,
    status: 'success',
    data: {
      validation: {
        error: false,
        field,
        field_value: fieldValue,
        condition,
        condition_value,
      },
    },
  };
}
module.exports = {
  evaluate,
};
