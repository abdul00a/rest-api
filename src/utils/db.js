const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_ORM_DATABASE,
  process.env.DB_ORM_USER,
  process.env.DB_ORM_PASS,
  {
    host: process.env.DB_ORM_HOST,
    dialect: process.env.DB_ORM_DIALECT
  }
);

module.exports = { sequelize };
