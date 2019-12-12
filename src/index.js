const express = require('express');
const { authorRouter } = require('./routes/authorRouter');
const { postRouter } = require('./routes/postRouter');
const { client } = require('./utils/config');
const { error, log } = require('./middleware/logging');

client
  .connect()
  .then(() => {
    const app = express();
    app.use(express.json());

    app.use(log);
    // End point router
    app.use('/', authorRouter);
    app.use('/author', postRouter);
    app.use(error);

    // router for all end point validation
    app.all('*', (req, res, next) => {
      next({
        message: `This URL is not Available please try diffrent URL/endpoint`,
        statusCode: 404
      });
    });
    // Error Handeler
    app.use((err, req, res, next) => {
      res.status(err.statusCode).send({ error: err.message });
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`server on port ${port}`));
  })
  .catch(err => {
    console.log(err.message);
    process.kill('');
  });
