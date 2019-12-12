// import Client funtion from postgres SQL
const { Client } = require('pg');

// Establish a connection from database
const client = new Client({
  user: 'api',
  password: 'api123',
  host: '127.0.0.1',
  port: 5432,
  database: 'users'
});

// export client connection
module.exports = {
  client
};
