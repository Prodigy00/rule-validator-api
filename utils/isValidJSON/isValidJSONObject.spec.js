const isValidJSONObject = require('./isValidJSONObject');

const str = 'something';
const arr = ['a', 'b'];
const num = 5;
const obj = { a: 1, b: 2 };
const key = 'c';

describe('test isValidJSONObject function', () => {
  describe('test first arg', () => {
    it('returns error message if first arg is not an obj or is undefined', () => {
      const error = new Error('Expected first arg to be of type: object');

      expect(() => isValidJSONObject(arr, str)).toThrowError(error);
      expect(() => isValidJSONObject(str, str)).toThrowError(error);
      expect(() => isValidJSONObject(num, str)).toThrowError(error);
      expect(() => isValidJSONObject(undefined, str)).toThrowError(error);
    });

    it('returns error message if obj is null', () => {
      const error = new Error('Object cannot be null');
      expect(() => isValidJSONObject(null, str)).toThrowError(error);
    });
  });

  describe('test second arg', () => {
    it('should return error message if second arg is undefined or not a string', () => {
      const error = new Error(`Expected second arg to be of type: string`);
      expect(() => isValidJSONObject(obj, arr)).toThrowError(error);
      expect(() => isValidJSONObject(obj, num)).toThrowError(error);
      expect(() => isValidJSONObject(obj, num)).toThrowError(error);
      expect(() => isValidJSONObject(obj, undefined)).toThrowError(error);
    });

    it('should return error message if second arg is not a key of first arg', () => {
      expect(() => isValidJSONObject(obj, key)).toThrowError(
        new Error(`${key} is not a key of ${obj}.`)
      );
    });
  });
});
