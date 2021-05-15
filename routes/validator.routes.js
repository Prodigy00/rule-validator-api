const validationRouter = require('express').Router();
const { homeRoute } = require('../controllers/validator.controller');

validationRouter.get('/', homeRoute);

module.exports = validationRouter;
