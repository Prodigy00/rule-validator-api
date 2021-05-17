function isObject(dataObj) {
  return typeof dataObj === 'object' && !Array.isArray(dataObj);
}

function isNestedObjectKey(field) {
  return field.split('.').length > 1;
}

module.exports = {
  isObject,
  isNestedObjectKey,
};
