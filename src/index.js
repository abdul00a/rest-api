const express = require('express');
// import routes
const { authorRouter } = require('./routes/authorRouter');
const { postRouter } = require('./routes/postRouter');

const { client } = require('./config/config'); // import pg client
const { error, log } = require('./middleware/logging'); // import logger
const { errorHandler } = require('../src/middleware/errormiddelware'); // error route
const { sequelize } = require('../src/utils/db'); // import sequlize connection

// connect to postgres DB with sequlize
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:');
    process.kill('');
  });

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

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`server on port ${port}`));
// })
// .catch(err => {
//   console.log(err.message);
//   process.kill('');
// });
