const Sequelize = require('sequelize');
const {
  database,
  user,
  password,
  host,
  dialect,
  port,
} = require('./database');

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect,
  port,
});

module.exports = sequelize;
