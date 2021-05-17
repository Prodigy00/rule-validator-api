module.exports = function isObject(dataObj) {
  return typeof dataObj === 'object' && !Array.isArray(dataObj);
};
