const {
  fieldCheckForDataAsArray,
  conditionPicker,
} = require('../models/data.model');
const isArray = require('../utils/isArray');
const isNumber = require('../utils/isNumber');
const isObject = require('../utils/isObject');
const isString = require('../utils/isString');

function evaluate({ field, condition, condition_value, data }) {
  const fieldIsNum = isNumber(field);
  const fieldIsObjKey = isObject(field);
  const fieldIsString = isString(field);

  const dataIsObj = isObject(data);
  const dataIsArray = isArray(data);
  const dataIsString = isString(data);

  if (fieldIsNum && dataIsArray) {
    let fieldValue = fieldCheckForDataAsArray(field, data);

    const operation = Object.keys(conditionPicker).find(condition_value);

    console.log({ operation });
  }
}

module.exports = {
  evaluate,
};
