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
  const { rule, data } = req.body;
  const { field, condition, condition_value } = rule;

  const result = evaluate({ field, condition, condition_value, data });

  if (result.status === 'error') {
    res.statusCode = 400;
    return res.send(result);
  }
  res.send(result);
}

module.exports = {
  homeRoute,
  validate,
};
