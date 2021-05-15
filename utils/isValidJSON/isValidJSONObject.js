module.exports = function isValidJSONObject(obj, key) {
  if (typeof obj !== 'string' || Array.isArray(obj)) {
    throw new Error('Expected first arg to be stringified obj');
  }
  if (obj === null || !obj) {
    throw new Error('Object cannot be null');
  }
  if (!key || typeof key !== 'string') {
    throw new Error(`Expected second arg to be of type: string`);
  }

  const parsedObj = JSON.parse(obj);

  if (!parsedObj[key]) {
    throw new Error(`${key} is not a key of ${parsedObj}.`);
  }

  if (Object.keys(parsedObj[key]).length === 3) {
    return parsedObj;
  } else {
    throw new Error(`${key} should be an object with 3 fields only`);
  }
};
