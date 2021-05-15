const isValidJSONObject = require('./isValidJSONObject');

const str = 'something';
const arr = ['a', 'b'];
const num = 5;
const obj = { a: 1, b: 2 };
const strObj = '{ "a": 1, "b": 2, "e":{"p":1, "q": 1, "r":1} }';
const key = 'c';

describe('test isValidJSONObject function', () => {
  describe('test first arg', () => {
    it('returns error message if first arg is not a stringified obj or is undefined', () => {
      const error = new Error('Expected first arg to be stringified obj');

      expect(() => isValidJSONObject(arr, str)).toThrowError(error);
      expect(() => isValidJSONObject(obj, str)).toThrowError(error);
      expect(() => isValidJSONObject(num, str)).toThrowError(error);
      expect(() => isValidJSONObject(undefined, str)).toThrowError(error);
      expect(() => isValidJSONObject(null, str)).toThrowError(error);
    });
  });

  describe('test second arg', () => {
    it('should return error message if second arg is undefined, null, or not a string', () => {
      const error = new Error(`Expected second arg to be of type: string`);
      expect(() => isValidJSONObject(strObj, arr)).toThrowError(error);
      expect(() => isValidJSONObject(strObj, num)).toThrowError(error);
      expect(() => isValidJSONObject(strObj, num)).toThrowError(error);
      expect(() => isValidJSONObject(strObj, undefined)).toThrowError(error);
      expect(() => isValidJSONObject(strObj, null)).toThrowError(error);
    });

    it('should return error message if second arg is not a key of first arg', () => {
      const parsedStrObj = JSON.parse(strObj);
      const error = new Error(`${key} is not a key of ${parsedStrObj}.`);

      expect(() => isValidJSONObject(strObj, key)).toThrowError(error);
    });
  });

  it('should return the parsed object if the subkey of the obj has exactly 3 keys', () => {
    const subKey = 'e';

    const result = isValidJSONObject(strObj, subKey);
    const parsedObj = JSON.parse(strObj);

    expect(result).toMatchObject(parsedObj);
  });

  it("should throw an error if the subkey isn't an object with 3 keys", () => {
    const subKey = 'b';
    const error = new Error(`${subKey} should be an object with 3 fields only`);

    expect(() => isValidJSONObject(strObj, subKey)).toThrowError(error);
  });
});
