require('dotenv').config();

const dialect = process.env.DB_DIALECT;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_DATABASE;

module.exports = {
  dialect,
  host,
  port,
  user,
  password,
  database,
};
