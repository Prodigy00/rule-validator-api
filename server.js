const express = require('express');
const { PORT } = require('./config/env');
const validationRouter = require('./routes/validator.routes');

const app = express();
const port = process.env.PORT || PORT;

app.use(express.json());
app.use(validationRouter);

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
