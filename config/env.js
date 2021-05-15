require('dotenv').config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  PORT,
  NODE_ENV,
};
