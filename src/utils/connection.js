const { Client } = require('pg');

const client = new Client({
  user: 'api',
  password: 'api123',
  host: '127.0.0.1',
  port: 5432,
  database: 'users'
});

module.exports = {
  client
};
