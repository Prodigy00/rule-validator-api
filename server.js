const app = require('./app');
const { PORT } = require('./config/env');
const logger = require('./utils/logger');

const port = process.env.PORT || PORT;

app.listen(port, () => {
  logger.info(`Server listening on port:${port}`);
});
