const validationRouter = require('express').Router();
const { homeRoute, validate } = require('../controllers/validator.controller');
const Validator = require('../middleware/validation');

validationRouter.get('/', homeRoute);

validationRouter.post('/validate-rule', Validator.ValidateRuleBody, validate);

module.exports = validationRouter;
