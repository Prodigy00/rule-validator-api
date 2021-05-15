const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config/env');
const validationRouter = require('./routes/validator.routes');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || PORT;

app.use(morgan('combined'));
app.use(express.json());
app.use(validationRouter);

app.listen(port, () => {
  logger.info(`Server listening on port:${port}`);
});
