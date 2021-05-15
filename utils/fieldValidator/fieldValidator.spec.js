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
  describe('test fnc for validating rule field', () => {
    it('returns an error message if rule field is not present', () => {
      const message = 'rule is required';
      expect(fieldValidator.ruleCheck(inputWithoutRule)).toMatch(message);
    });

    it('should be valid JSON object', () => {});

    it('return obj if rule field exists and is valid', () => {});
  });
});
