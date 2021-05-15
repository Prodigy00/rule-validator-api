module.exports = function isValidJSONObject(obj, key) {
  if (typeof obj !== 'object' || Array.isArray(obj)) {
    throw new Error('Expected first arg to be of type: object');
  }
  if (obj === null || !obj) {
    throw new Error('Object cannot be null');
  }
  if (!key || typeof key !== 'string') {
    throw new Error(`Expected second arg to be of type: string`);
  }
  if (!obj[key]) {
    throw new Error(`${key} is not a key of ${obj}.`);
  }
};
