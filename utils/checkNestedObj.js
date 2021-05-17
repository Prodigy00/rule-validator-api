const isNumber = require('./isNumber');

function nestedObjCheck(str) {
  return {
    level: str.split('.').length,
    isBeyondTwoLevels: str.split('.').length > 3,
  };
}

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

  if (!fieldValueExists) {
    const error = new Error(`field ${field} is missing from data.`);
    error.statusCode = 400;
    throw error;
  }
  return fieldValue;
}
