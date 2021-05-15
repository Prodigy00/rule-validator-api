const validationRouter = require('express').Router();
const { homeRoute, validate } = require('../controllers/validator.controller');

validationRouter.get('/', homeRoute);

validationRouter.post('/validate-rule', validate);

module.exports = validationRouter;
