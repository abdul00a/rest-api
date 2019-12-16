const express = require('express');
const dotenv = require('dotenv');
// import routes
const { authorRouter } = require('./routes/authorRouter');
const { postRouter } = require('./routes/postRouter');

const { client } = require('./config/config'); // import pg client
const { error, log } = require('./middleware/logging'); // import logger
const { errorHandler } = require('../src/middleware/errormiddelware'); // error route
const { sequelize } = require('./config/db'); // import sequlize connection

dotenv.config();

process.on('unhandledRejection', err => {
  console.log('unhandledRejection', err.message);
});
// connect to postgres DB with sequlize

// connect to postgres DB without sequlize
// client
//   .connect()
//   .then(() => {
const app = express();
app.use(express.json());

// winston info logger
app.use(log);

// Routes Middleware
app.use('/', authorRouter);
app.use('/author', postRouter);

// winston error logger
app.use(error);

// routes for all HTTP request end point
app.all('*', (req, res, next) => {
  next({
    message: `This URL is not Available please try diffrent URL/endpoint`,
    statusCode: 406
  });
});

// Error Handeler Middlewares
app.use(errorHandler);

const port = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () => console.log(`server on port ${port}`));
    console.log('Connection has been established successfully.');
  })
  .catch(() => {
    console.error('Unable to connect to the database:');
    process.kill('');
  });
// })
// .catch(err => {
//   console.log(err.message);
//   process.kill('');
// });
