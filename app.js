const express = require('express');
const morgan = require('morgan');

const errorHandler = require('./middleware/errorHandler');
const validationRouter = require('./routes/validator.routes');

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(validationRouter);
app.use(errorHandler);

module.exports = app;
