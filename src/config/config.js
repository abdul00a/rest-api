const dotenv = require('dotenv');
// import Client funtion from postgres SQL
const { Client } = require('pg');

dotenv.config();

// Establish a connection from database
const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});

// export client connection
module.exports = {
  client
};
