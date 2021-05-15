const fieldValidator = require('./fieldValidator');

const inputWithoutRule = {
  data: {
    name: 'James Holden',
    crew: 'Rocinante',
    age: 34,
    position: 'Captain',
    missions: 45,
  },
};

describe('Test field validator module', () => {
  describe('test rule checker fnc', () => {
    test('return an error message if rule field is not present', () => {
      const message = 'rule is required';
      expect(fieldValidator.ruleCheck(inputWithoutRule)).toMatch(message);
    });

    test('rule field should be valid JSON object', () => {});

    test('return obj if rule field exists and is valid', () => {});
  });
});
