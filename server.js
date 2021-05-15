const express = require('express');
const { PORT } = require('./config/env');

const app = express();
const port = process.env.PORT || PORT;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port:${port}`);
});
