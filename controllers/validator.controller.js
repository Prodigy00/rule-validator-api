const { evaluate } = require('../service/rule-validation.service');

function homeRoute(req, res, next) {
  res.send({
    message: 'My Rule-Validation API.',
    status: 'success',
    data: {
      name: 'Gideon Idowu',
      github: '@Prodigy00',
      email: 'simplygiddy@gmail.com',
      mobile: '08064999937',
    },
  });
}

function validate(req, res, next) {
  //destructure field, condition and condition_value from req.body.rule
  //split the field by '.', if length is more than 1, it's an object
  //if field is object, run a check that:
  //(i) ensures the length is not more than 3(<= two levels of nesting)
  //(ii) ensures the data field is an object
  //(iii) ensures the data object has the fields as stated in the field of the rule obj
  //(iv) runs the operation as data.field[condition][condition_value]
  //if field is not obj i.e. split op returns length of 1, run a check that:
  //(i)checks if value of string is number or alphabet
  //if field value is number, ops:
  /**
   * data field as an array returns operation comparing arr[field_val_as_number][condition][condition_value]
   * data field as a string returns operation comparing str.charAt(field_val_as_number)[condition][condition_value]
   */
  //determine if the data field is array, string or object

  const { rule, data } = req.body;
  const { field, condition, condition_value } = rule;

  const result = evaluate({ field, condition, condition_value, data });
  res.send(result);
}

module.exports = {
  homeRoute,
  validate,
};
